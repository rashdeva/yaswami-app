import { getUserById } from "~/db/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { UserData } from "~/db/userStore";
import { ReactNode, useEffect, useState } from "react";
import { getProfilePhotoUrl } from "~/db/storage";
import { parseUser } from "~/db/parsers";
import { UserDto } from "~/db/models";

export const getName = (user: UserData): string => {
  if (user.firstName) return `${user.firstName} ${user.lastName}`;
  else if (user.username) return user.username;
  else return "";
};

export const getShortName = (user: UserData): string => {
  if (user.firstName)
    return `${user.firstName?.toUpperCase().charAt(0)}${user.lastName
      ?.toUpperCase()
      .charAt(0)}`;
  else if (user.username) return user.username.toUpperCase().charAt(0);
  else return "";
};

export function UserCard({
  userId,
  extra,
  disableName = false,
}: {
  userId: number;
  extra?: ReactNode;
  disableName?: boolean;
}) {
  const { data: user } = useQuery({
    queryKey: ["users", userId],
    queryFn: () =>
      getUserById(userId).then((data) =>
        parseUser(data[0] as unknown as UserDto)
      ),
    enabled: !!userId,
  });

  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  useEffect(() => {
    if (user?.photoUrl) {
      getProfilePhotoUrl(user.photoUrl)
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
          {!disableName && (
            <span className="flex flex-col items-start">
              <span className="font-bold">
                {getName(user as unknown as UserData)}
              </span>
              {extra}
            </span>
          )}
        </span>
      </Link>
    )
  );
}
