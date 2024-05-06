import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useReroute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = window?.Telegram?.WebApp?.initDataUnsafe;

    if (data && data.hasOwnProperty("start_param")) {
      if (data.start_param?.includes("event")) {
        const eventId = data.start_param.split("event-")[0];
        navigate(`/events/${eventId}/view`);
      }
    }
  }, []);
};
