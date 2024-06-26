import LogoPng from "~/assets/sun.svg";
import { useEffect } from "react";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Placeholder } from "@telegram-apps/telegram-ui";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "~/db/api";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { config } from "~/config";

export default function EventsPage() {
  const mb = useMainButton();
  const bb = useBackButton();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["event"],
    queryFn: getEvents,
  });

  useEffect(() => {
    if (bb) {
      bb.hide();
    }
  }, [bb]);

  useEffect(() => {
    const handleClick = () => {
      navigate("/events/create");
    };

    mb.setBgColor("#").setText("Create Event").show().on("click", handleClick);

    return () => {
      mb.hide().off("click", handleClick);
    };
  }, [mb]);

  return (
    <div className="h-dvh py-4">
      {data?.length === 0 && (
        <Placeholder
          header="Yaswami"
          description="У вас пока нет созданных событий"
        >
          <img src={LogoPng} alt="" className="w-32" />
        </Placeholder>
      )}

      {data && data?.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Your events</h1>
          {data.map((event) => {
            return (
              <Card className="rounded-lg">
                <Link to={`/events/${event.id}/view`}>
                  <CardHeader>{event.title}</CardHeader>
                  <CardContent>
                    <div>
                      {event.start_date} {event.start_time}
                    </div>
                    <div>{event.location}</div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      )}

      {config.isLocalDev && (
        <Button asChild variant="default">
          <Link to={"/events/create"}>Create Event</Link>
        </Button>
      )}
    </div>
  );
}
