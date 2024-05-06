import {
  getEventById,
  getParticipateStatus,
  participateEvent,
  unparticipateEvent,
} from "../../../db/api";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "~/db/userStore";
import { Button } from "~/components/ui/button";
import { Participants } from "./participants";
import { UserCard } from "~/components/user-card";

function generateTelegramShareUrl(eventId?: string, text: string = "") {
  if (!eventId) return "";

  const encodedText = encodeURIComponent(text);
  return `https://t.me/share/url?text=${encodedText}&url=https://t.me/yaswami_bot/join?startapp=event-${eventId}`;
}

export default function EventViewPage() {
  const { eventId } = useParams();
  const userData = useUserStore((state) => state.data);
  const queryClient = useQueryClient();

  const participateMutation = useMutation({
    mutationFn: participateEvent,
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: ["participants"] });
    },
  });

  const unparticipateMutation = useMutation({
    mutationFn: unparticipateEvent,
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: ["participants"] });
    },
  });

  const { data: eventData } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId!),
    enabled: !!eventId,
  });

  const { data: isParticipated } = useQuery({
    queryKey: ["participants", "isParticipated"],
    queryFn: () => getParticipateStatus(Number(eventId), userData.id!),
    enabled: !!eventId && !!userData?.id,
  });

  const handleParticipate = () => {
    if (eventId && userData?.id) {
      participateMutation.mutate({
        event_id: Number(eventId),
        user_id: userData.id,
      });
    }
  };

  const handleUnparticipate = () => {
    if (eventId && userData?.id) {
      unparticipateMutation.mutate({
        event_id: Number(eventId),
        user_id: userData.id,
      });
    }
  };

  const shareUrl = generateTelegramShareUrl(
    eventId,
    "Записывайся на событие! Используй ссылку ниже чтобы открыть информацию"
  );

  return (
    eventData && (
      <div className="container py-8 space-y-2">
        <UserCard userId={Number(eventData[0].owner_id)} />
        <h1 className="text-2xl font-bold">{eventData[0].title}</h1>
        <p className="text-sm">{eventData[0].description}</p>

        <Participants eventId={Number(eventId)} />

        {!isParticipated && (
          <Button
            className="w-full"
            onClick={handleParticipate}
            disabled={participateMutation.isPending}
          >
            Принять участие
          </Button>
        )}
        {isParticipated && (
          <Button
            className="w-full"
            onClick={handleUnparticipate}
            disabled={unparticipateMutation.isPending}
            variant="destructive"
          >
            Отменить участие
          </Button>
        )}

        <Button className="w-full" variant="secondary" asChild>
          <Link to={shareUrl}>Поделиться</Link>
        </Button>

        <div className="fixed bottom-0 left-0 right-0 h-14">
          <Button
            asChild
            className="w-full h-full rounded-none"
            variant="secondary"
          >
            <Link to="https://t.me/yaswami_bot">Перейти в бота</Link>
          </Button>
        </div>
      </div>
    )
  );
}
