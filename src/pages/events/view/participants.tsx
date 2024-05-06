import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
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
      <Card className="p-3 px-4">
        <h2 className="text-sm text-muted-foreground mb-2">Уже участвуют:</h2>
        {participants.map((participant) => {
          const user = participant.user as unknown as UserData;

          return (
            <div key={participant.id} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.thumbnail_url} />
                <AvatarFallback>
                  {user.first_name?.toUpperCase().charAt(0)}
                  {user.last_name?.toUpperCase().charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">
                {user.first_name} {user.last_name}
              </div>
            </div>
          );
        })}
      </Card>
    )
  );
};
