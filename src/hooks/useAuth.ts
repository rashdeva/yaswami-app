import { useEffect } from "react";
import { UserData, useUserStore } from "~/db/userStore";

export const useAuth = () => {
  const setData = useUserStore((state) => state.setData);

  // todo: validate data
  
  useEffect(() => {
    const data = window?.Telegram?.WebApp?.initDataUnsafe;

    if (data && Object.keys(data).length > 0) {
      setData(data!.user as unknown as UserData);
    }
  }, []);
};
