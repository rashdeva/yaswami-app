import { useEffect } from "react";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "~/db/api";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { config } from "~/config";
import { useUserStore } from "~/db/userStore";
import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const mb = useMainButton();
  const bb = useBackButton();
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.user.id);
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEvents(userId!),
    enabled: !!userId,
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

    mb.setBgColor("#")
      .setText(t("events.createEvent"))
      .show()
      .enable()
      .on("click", handleClick);

    return () => {
      mb.hide().off("click", handleClick);
    };
  }, [mb]);

  return (
    <div className="h-dvh py-4">
      <h1 className="text-xl font-bold mb-1">{t("events.h1")}</h1>
      {data?.length === 0 && <p>{t("events.noEvents")}</p>}

      {data && data?.length > 0 && (
        <div className="flex flex-col gap-2">
          {data.map((event) => {
            return (
              <Card key={event.id} className="rounded-lg">
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
        <Button asChild variant="default" className="mt-4">
          <Link to={"/events/create"}>{t("events.createEvent")}</Link>
        </Button>
      )}
    </div>
  );
}
