import { useQuery } from "@tanstack/react-query";
import { Share } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { UserCard } from "~/components/user-card";
import { config } from "~/config";
import { getParticipantsByEventId } from "~/db/api";
import { cn } from "~/lib/utils";

function generateTelegramShareUrl(eventId?: string, text: string = "") {
  if (!eventId) return "";

  const encodedText = encodeURIComponent(text);
  return `https://t.me/share/url?text=${encodedText}&url=https://t.me/${config.botName}/join?startapp=event-${eventId}`;
}

export const Participants = ({
  eventId,
  className,
}: {
  eventId: number;
  className?: string;
}) => {
  const { data: participants } = useQuery({
    queryKey: ["participants"],
    queryFn: () => getParticipantsByEventId(eventId),
    enabled: !!eventId,
  });

  const shareUrl = generateTelegramShareUrl(
    eventId.toString(),
    "Записывайся на событие! Используй ссылку ниже чтобы открыть информацию"
  );

  return (
    participants &&
    participants.length > 0 && (
      <Card
        className={cn(
          "p-3 shadow-lg border-none inline-flex rounded-3xl justify-center gap-2",
          className
        )}
      >
        <div className="flex -space-x-4">
          {participants.map((participant) => {
            return (
              <UserCard
                disableName
                key={participant.userId}
                userId={participant.userId}
              />
            );
          })}
        </div>
        <Button variant="outline" asChild className="rounded-full gap-2 ">
          <Link to={shareUrl}>
            Позвать друзей <Share className="w-5 h-5" />
          </Link>
        </Button>
      </Card>
    )
  );
};
