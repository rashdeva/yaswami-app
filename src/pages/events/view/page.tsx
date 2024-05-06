import { getEventById, getParticipateStatus, participateEvent, unparticipateEvent } from "../../../db/api";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "~/db/userStore";
import { Button } from "~/components/ui/button";
import { Participants } from "./participants";

export default function EventViewPage() {
  const { eventId } = useParams();
  const userData = useUserStore((state) => state.data);
  const queryClient = useQueryClient();

  const participateMutation = useMutation({
    mutationFn: participateEvent,
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: ['participants'] });
    }
  });

  const unparticipateMutation = useMutation({
    mutationFn: unparticipateEvent,
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: ['participants'] });
    }
  });

  const { data: eventData } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEventById(eventId),
  });

  

  const { data: isParticipated } = useQuery({
    queryKey: ["participants", "isParticipated"],
    queryFn: () => getParticipateStatus(Number(eventId), userData.id!),
    enabled: !!eventId && !!userData?.id
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

  return (
    eventData && (
      <div className="container py-8 space-y-2">
        <h1 className="text-2xl font-bold">{eventData[0].title}</h1>
        <p className="text-sm">{eventData[0].description}</p>

        <Participants eventId={Number(eventId)} />

        {!isParticipated && <Button className="w-full" onClick={handleParticipate} disabled={participateMutation.isPending}>Принять участие</Button>}
        {isParticipated && <Button className="w-full" onClick={handleUnparticipate} disabled={unparticipateMutation.isPending} variant="destructive">Отменить участие</Button>}
      </div>
    )
  );
}
