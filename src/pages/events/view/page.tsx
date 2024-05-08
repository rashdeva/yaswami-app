import {
  getEventById,
  getParticipateStatus,
  participateEvent,
  unparticipateEvent,
} from "~/db/api";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "~/db/userStore";
import { Button } from "~/components/ui/button";
import { Participants } from "./participants";
import { CardFooter } from "~/components/ui/card";
import LogoPng from "~/assets/logo.png";
import { useMainButton } from "@tma.js/sdk-react";
import { useCallback, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";

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

  const isPending =
    participateMutation.isPending || unparticipateMutation.isPending;

  const handleParticipate = useCallback(async () => {
    if (eventId && userData?.id) {
      participateMutation.mutate({
        event_id: Number(eventId),
        user_id: userData.id,
      });
    }
  }, [eventId, userData?.id, participateMutation, isPending]);

  const handleUnparticipate = useCallback(() => {
    if (eventId && userData?.id) {
      unparticipateMutation.mutate({
        event_id: Number(eventId),
        user_id: userData.id,
      });
    }
  }, [eventId, userData?.id, unparticipateMutation]);

  const mainButton = useMainButton();

  useEffect(() => {
    if (participateMutation.isPending || unparticipateMutation.isPending) {
      mainButton.showLoader();
      mainButton.disable();
    } else {
      mainButton.hideLoader();
      mainButton.enable();
    }
  }, [participateMutation.isPending, unparticipateMutation.isPending]);

  useEffect(() => {
    if (isParticipated) {
      mainButton.on("click", handleUnparticipate);
    } else {
      mainButton.on("click", handleParticipate);
    }
    mainButton.setText(isParticipated ? "Отменить участие" : "Принять участие");
    mainButton.setBackgroundColor(isParticipated ? "#DC2323" : "#");

    return () => {
      mainButton.off("click", handleParticipate);
      mainButton.off("click", handleUnparticipate);
    };
  }, [isParticipated]);

  useEffect(() => {
    mainButton.enable();
    mainButton.show();
  }, []);

  const event = eventData ? eventData[0] : undefined;

  return (
    event && (
      <div>
        <header className="flex flex-col items-center">
          {event.thumbnail_url && (
            <div className="div -mx-[0.15rem]">
              <img src={event.thumbnail_url} alt="" className="" />
            </div>
          )}
          <Participants eventId={Number(eventId)} className="-mt-8" />
        </header>
        <div className="pb-8 space-y-2">
          <div className="pt-6 px-4 space-y-4">
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
          <CardFooter className="justify-center"></CardFooter>
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
      </div>
    )
  );
}
