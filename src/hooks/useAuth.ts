import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createUser, getUserById } from "~/db/api";
import { UserData, useUserStore } from "~/db/userStore";

export const useAuth = () => {
  const setData = useUserStore((state) => state.setData);
  const webAppData = window?.Telegram?.WebApp?.initDataUnsafe;

  const createUserMutation = useMutation({
    mutationFn: createUser,
  });

  const { data: isUserExist } = useQuery({
    queryKey: ["participants", "isParticipated"],
    queryFn: () =>
      getUserById(webAppData!.user!.id).then((data) => data.length > 0),
    enabled: !!webAppData?.user?.id,
  });

  if (!isUserExist && webAppData.user) {
    createUserMutation.mutate(webAppData.user);
  }

  useEffect(() => {
    if (webAppData && Object.keys(webAppData).length > 0) {
      setData(webAppData!.user as unknown as UserData);
    }
  }, []);
};
