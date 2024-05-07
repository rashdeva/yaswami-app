import { getUserById } from "~/db/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { UserData } from "~/db/userStore";

export const getName = (user: UserData): string => {
  if (user.first_name) return `${user.first_name} ${user.last_name}`;
  else if (user.username) return user.username;
  else return "";
};

export function UserCard({ userId }: { userId: number }) {
  const { data: user } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId).then((data) => data[0]),
    enabled: !!userId,
  });

  return (
    user && (
      <Link to={`https://t.me/${user.username}`}>
        <span className="inline-flex items-center gap-2">
          <Avatar >
            <AvatarImage src={""} />
            <AvatarFallback>
              {user.first_name?.toUpperCase().charAt(0)}
              {user.last_name?.toUpperCase().charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="flex flex-col items-start">
            <span className="font-bold text-sm">{getName(user as unknown as UserData)}</span>
            <span className="font-medium text-xs text-primary bg-primary-foreground px-1 py-[1px] rounded-md">Ведущая</span>
          </span>
        </span>
      </Link>
    )
  );
}
