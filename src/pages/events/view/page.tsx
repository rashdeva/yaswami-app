import {
  getEventById,
  getParticipateStatus,
  participateEvent,
  unparticipateEvent,
} from "~/db/api";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "~/db/userStore";
import { Participants } from "./participants";
import { useMainButton } from "@tma.js/sdk-react";
import { useCallback, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { useBack } from "~/hooks/useBack";

export default function EventViewPage() {
  useBack("/events");

  const { eventId } = useParams();
  const userData = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const mb = useMainButton();

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

  const toggleParticipate = useCallback(() => {
    if (eventId && userData?.id) {
      if (isParticipated) {
        unparticipateMutation.mutate({
          event_id: Number(eventId),
          user_id: userData.id,
        });
      } else {
        participateMutation.mutate({
          event_id: Number(eventId),
          user_id: userData.id,
        });
      }
    }
  }, [eventId, userData?.id, unparticipateMutation, isParticipated]);

  useEffect(() => {
    if (participateMutation.isPending || unparticipateMutation.isPending) {
      mb.showLoader().disable();
    } else {
      mb.hideLoader().enable();
    }
  }, [participateMutation.isPending, unparticipateMutation.isPending]);

  useEffect(() => {
    mb.setText(isParticipated ? "Отменить участие" : "Принять участие")
      .setBgColor(isParticipated ? "#DC2323" : "#")
      .on("click", toggleParticipate);

    return () => {
      mb.off("click", toggleParticipate);
    };
  }, [isParticipated]);

  useEffect(() => {
    mb.enable().show();

    return () => {
      mb.disable().hide();
    };
  }, []);

  const event = eventData ? eventData[0] : undefined;

  return (
    event && (
      <div className="py-4">
        <header className="flex flex-col items-center">
          {event.thumbnail_url && (
            <div className="rounded-3xl overflow-hidden">
              <img src={event.thumbnail_url} alt="" className="" />
            </div>
          )}
          <Participants eventId={Number(eventId)} className="-mt-8" />
        </header>
        <div className="pb-8 space-y-2">
          <div className="pt-4 space-y-4">
            <h1 className="text-3xl tracking-tighter mb-4">{event.title}</h1>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-foreground/10">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex">
                  <span className="font-medium">{event.start_date}</span>
                  {event.start_time ||
                    (event.end_time && (
                      <span>
                        {event.start_time} {`– ${event.end_time}`}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-foreground/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex">
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>
            <p className="text-base" style={{ whiteSpace: "pre-wrap" }}>
              {event.description}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
