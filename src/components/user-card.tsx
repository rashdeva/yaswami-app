import { getUserById } from "~/db/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { UserData } from "~/db/userStore";
import { ReactNode } from "react";

export const getName = (user: UserData): string => {
  if (user.first_name) return `${user.first_name} ${user.last_name}`;
  else if (user.username) return user.username;
  else return "";
};

export const getShortName = (user: UserData): string => {
  if (user.first_name) return `${user.first_name?.toUpperCase().charAt(0)}${user.last_name?.toUpperCase().charAt(0)}`;
  else if (user.username) return user.username.toUpperCase().charAt(0);
  else return "";
};

export function UserCard({
  userId,
  extra,
}: {
  userId: number;
  extra?: ReactNode;
}) {
  const { data: user } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId).then((data) => data[0]),
    enabled: !!userId,
  });

  return (
    user && (
      <Link to={`https://t.me/${user.username}`}>
        <span className="inline-flex items-center gap-2">
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>
              {getShortName(user as unknown as UserData)}
            </AvatarFallback>
          </Avatar>
          <span className="flex flex-col items-start">
            <span className="font-bold text-sm">
              {getName(user as unknown as UserData)}
            </span>
            {extra}
          </span>
        </span>
      </Link>
    )
  );
}
