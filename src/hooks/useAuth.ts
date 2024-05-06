import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { createUser, getUserById } from "~/db/api";
import { UserData, useUserStore } from "~/db/userStore";

export const useAuth = () => {
  const setData = useUserStore((state) => state.setData);
  const webAppData = window?.Telegram?.WebApp?.initDataUnsafe;
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSettled: async () => {
      await queryClient.refetchQueries({ queryKey: ['users'] })
    }
  });

  const { data: isUserExist } = useQuery({
    queryKey: ["users", "isUserExist"],
    queryFn: () =>
      getUserById(webAppData!.user!.id).then((data) => data.length > 0),
    enabled: !!webAppData?.user?.id,
  });


  if (!isUserExist && webAppData.user) {
    createUserMutation.mutate({
      telegram_id: webAppData.user.id,
      username: webAppData.user.username,
      first_name: webAppData.user.first_name,
      last_name: webAppData.user.last_name,
      language_code: webAppData.user.language_code,
    });
  }

  useEffect(() => {
    if (webAppData && Object.keys(webAppData).length > 0) {
      setData(webAppData!.user as unknown as UserData);
    }
  }, []);
};
