import LogoPng from "~/assets/logo.png";
import { UserData, useUserStore } from "~/db/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getShortName } from "./user-card";

export const Header = () => {
  const user = useUserStore((state) => state.user);

  return (
    <header className="bg-card container py-4 flex justify-between">
      <img src={LogoPng} alt="logo" className="w-10 h-10" />
      <Avatar>
        <AvatarImage src={user.thumbnailUrl} />
        <AvatarFallback>
          {getShortName(user as unknown as UserData)}
        </AvatarFallback>
      </Avatar>
    </header>
  );
};
