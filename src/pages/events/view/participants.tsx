import { useQuery } from "@tanstack/react-query";
import { Card } from "~/components/ui/card";
import { UserCard } from "~/components/user-card";
import { getParticipantsByEventId } from "~/db/api";
import { UserData } from "~/db/userStore";

export const Participants = ({ eventId }: { eventId: number }) => {
  const { data: participants } = useQuery({
    queryKey: ["participants"],
    queryFn: () => getParticipantsByEventId(eventId),
    enabled: !!eventId,
  });

  return (
    participants &&
    participants.length > 0 && (
      <Card className="p-3 px-4 rounded-2xl w-full">
        <h2 className="text-sm text-muted-foreground mb-2">Уже участвуют:</h2>
        <div className="flex flex-col gap-2">
          {participants.map((participant) => {
            const user = participant.user as unknown as UserData;

            return <UserCard userId={user.telegram_id!} />;
          })}
        </div>
      </Card>
    )
  );
};
