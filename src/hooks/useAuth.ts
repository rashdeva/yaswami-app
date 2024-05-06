import { useEffect } from "react";
import { UserData, useUserStore } from "~/db/userStore";

export const useAuth = () => {
  const setData = useUserStore((state) => state.setData);

  useEffect(() => {
    const data = window?.Telegram?.WebApp?.initDataUnsafe as unknown as (UserData | undefined);

    if (data && Object.keys(data).length > 0) {
      setData(data);
    }
  }, []);
};
