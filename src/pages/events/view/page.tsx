import {
  getEventById,
  getParticipateStatus,
  participateEvent,
  unparticipateEvent,
} from "../../../db/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "~/db/userStore";
import { Button } from "~/components/ui/button";
import { Participants } from "./participants";
import { UserCard } from "~/components/user-card";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import LogoPng from "~/assets/logo.png";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { useCallback, useEffect } from "react";
import { Share } from "lucide-react";

function generateTelegramShareUrl(eventId?: string, text: string = "") {
  if (!eventId) return "";

  const encodedText = encodeURIComponent(text);
  return `https://t.me/share/url?text=${encodedText}&url=https://t.me/yaswami_bot/join?startapp=event-${eventId}`;
}

export default function EventViewPage() {
  const { eventId } = useParams();
  const userData = useUserStore((state) => state.data);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const handleParticipate = useCallback(() => {
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

  const shareUrl = generateTelegramShareUrl(
    eventId,
    "Записывайся на событие! Используй ссылку ниже чтобы открыть информацию"
  );

  const mainButton = useMainButton();
  const backButton = useBackButton();

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
    mainButton.setBackgroundColor(isParticipated ? "#ff0000" : "#");

    return () => {
      mainButton.off("click", handleParticipate);
      mainButton.off("click", handleUnparticipate);
    };
  }, [isParticipated]);

  useEffect(() => {
    backButton.show();
    backButton.on("click", () => navigate(-1));

    mainButton.enable();
    mainButton.show();

    return () => {
      backButton.off("click", () => navigate(-1));
      backButton.hide();

      mainButton.disable();
      mainButton.hide();
    };
  }, []);

  return (
    eventData && (
      <div className="container pt-4 pb-8 space-y-2">
        <div className="flex justify-between gap-3 px-4">
          <UserCard
            userId={Number(eventData[0].owner_id)}
            extra={
              <span className="font-medium text-xs text-primary bg-primary-foreground px-1 py-[1px] rounded-md">
                Ведущая
              </span>
            }
          />
          <Button variant="ghost" asChild className="rounded-full w-10 h-10 p-0">
            <Link to={shareUrl}><Share className="w-4 h-4" /></Link>
          </Button>
        </div>
        <Card className="rounded-3xl">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4">{eventData[0].title}</h1>
            <p className="text-[0.8125rem]" style={{ whiteSpace: "pre-wrap" }}>
              {eventData[0].description}
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Participants eventId={Number(eventId)} />
          </CardFooter>
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
