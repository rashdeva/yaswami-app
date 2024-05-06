import { Tables } from "~/database.types";
import { UseFormReturn } from "react-hook-form";
import { getUserById } from "~/db/api";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

export type EventFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: Tables<"events">) => void;
};

export function UserCard({ userId }: { userId: number }) {
  const { data: user } = useQuery({
    queryKey: ["users", "isUserExist"],
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
              {user.first_name?.toUpperCase().charAt(0)}
              {user.last_name?.toUpperCase().charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold">
            {user.first_name} {user.last_name}
          </span>
        </span>
      </Link>
    )
  );
}
