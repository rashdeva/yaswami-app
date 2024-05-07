import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLaunchParams } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { createUser, getUserById } from "~/db/api";
import { UserData, useUserStore } from "~/db/userStore";

export const useAuth = () => {
  const setData = useUserStore((state) => state.setData);
  const launchParams = useLaunchParams();
  const webAppData = launchParams.initData;
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { data: isUserExist, refetch: refetchUserExistence } = useQuery({
    queryKey: ["users", "isUserExist"],
    queryFn: () =>
      getUserById(webAppData!.user!.id).then((data) => data?.length > 0),
    enabled: !!webAppData?.user?.id,
    initialData: false, // Assuming user does not exist initially
  });

  useEffect(() => {
    // Ensure webAppData is available and user's existence is checked
    if (webAppData?.user && isUserExist === false) {
      createUserMutation.mutate({
        telegram_id: webAppData.user.id,
        username: webAppData.user.username,
        first_name: webAppData.user.firstName,
        last_name: webAppData.user.lastName,
        language_code: webAppData.user.languageCode,
      });
    }
  }, [webAppData, isUserExist]); // Depend on webAppData and isUserExist

  useEffect(() => {
    // Store user data in state management if webAppData is available
    if (webAppData && Object.keys(webAppData).length > 0) {
      setData(webAppData.user as UserData);
    }
  }, [webAppData, setData]);

  useEffect(() => {
    // Refetch the user existence status when the user's ID is known
    if (webAppData?.user?.id) {
      refetchUserExistence();
    }
  }, [webAppData?.user?.id, refetchUserExistence]);
};
