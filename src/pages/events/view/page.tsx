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
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import LogoPng from "~/assets/logo.png";

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
      <div className="container pt-2 pb-8 space-y-2">
        <Card className="rounded-3xl">
          <CardHeader className="border-b pb-4">
            <div className="flex flex-col gap-3">
              <UserCard userId={Number(eventData[0].owner_id)} />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold">{eventData[0].title}</h1>
            <p className="text-sm pre" style={{ whiteSpace: "pre-wrap" }}>
              {eventData[0].description}
            </p>

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
          </CardContent>
        </Card>
        <div className="text-center pt-4">
          <Button
            asChild
            className="h-full rounded-2xl inline-flex gap-2 text-sm"
            variant="ghost"
          >
            <Link to="https://t.me/yaswami_bot">
              <img src={LogoPng} width={20} height={20} alt="" />
              Yaswami Bot
            </Link>
          </Button>
        </div>
      </div>
    )
  );
}
