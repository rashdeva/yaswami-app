import { getUserById } from "~/db/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { UserData } from "~/db/userStore";
import { ReactNode, useEffect, useState } from "react";
import { getProfilePhotoUrl } from "~/db/storage";

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
  disableName = false
}: {
  userId: number;
  extra?: ReactNode;
  disableName?: boolean;
}) {
  const { data: user } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId).then((data) => data[0]),
    enabled: !!userId,
  });

  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  useEffect(() => {
    if (user?.photo) {
      getProfilePhotoUrl(user.photo)
        .then((url) => setProfilePhotoUrl(url))
        .catch((error) => console.error(error));
    }
  }, [user]);

  return (
    user && (
      <Link to={`https://t.me/${user.username}`}>
        <span className="inline-flex items-center gap-2">
          <Avatar>
          <AvatarImage src={profilePhotoUrl} />
            <AvatarFallback>
              {getShortName(user as unknown as UserData)}
            </AvatarFallback>
          </Avatar>
          {!disableName && <span className="flex flex-col items-start">
            <span className="font-bold">
              {getName(user as unknown as UserData)}
            </span>
            {extra}
          </span>}
        </span>
      </Link>
    )
  );
}
