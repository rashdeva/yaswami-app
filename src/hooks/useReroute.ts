import { useLaunchParams } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useReroute = () => {
  const navigate = useNavigate();
  const launchParams = useLaunchParams();

  useEffect(() => {
    const data = launchParams.initData;

    if (data && data.hasOwnProperty("start_param")) {
      if (launchParams.startParam?.includes("event")) {
        const eventId = launchParams.startParam.split("event-")[1];
        navigate(`/events/${eventId}/view`);
      }
    }
  }, []);
};
