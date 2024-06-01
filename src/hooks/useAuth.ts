import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLaunchParams } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { createUser, getUserById } from "~/db/api";
import { UserData, useUserStore } from "~/db/userStore";

export const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);
  const launchParams = useLaunchParams();
  const webAppData = launchParams.initData;
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });

  const { data: isUserExist, isFetching: isUserLoading } = useQuery({
    queryKey: ["users", webAppData?.user?.id],
    queryFn: () => getUserById(webAppData!.user!.id).then((result) => result?.length !== 0),
    enabled: !!webAppData?.user?.id,
    initialData: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (webAppData?.user && !isUserExist && !isUserLoading) {
      createUserMutation.mutate({
        telegram_id: webAppData.user.id,
        username: webAppData.user.username,
        first_name: webAppData.user.firstName,
        last_name: webAppData.user.lastName,
        language_code: webAppData.user.languageCode,
      });
    }
  }, [webAppData, isUserExist, isUserLoading]);

  useEffect(() => {
    if (webAppData?.user) {
      setUser(webAppData.user as UserData);
    }
  }, [webAppData, setUser]);
};
