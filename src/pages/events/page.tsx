import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "~/db/api";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useUserStore } from "~/db/userStore";
import { useTranslation } from "react-i18next";
import { PlusCircle } from "lucide-react";
import { useBackButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

export default function EventsPage() {
  const userId = useUserStore((state) => state.user.id);
  const { t } = useTranslation();
  const bb = useBackButton();

  const { data } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEvents(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if(bb) {
      bb.hide();
    }
  }, [bb])

  return (
    <main className="py-4 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("events.h1")}</h1>
        <Button asChild variant="default" className="gap-2">
          <Link to={"/events/create"}>
            <PlusCircle className="h-4 w-4" />
            {t("events.newEvent")}
          </Link>
        </Button>
      </header>
      {data?.length === 0 && <p>{t("events.noEvents")}</p>}

      {data && data?.length > 0 && (
        <div className="flex flex-col gap-2">
          {data.map((event) => {
            return (
              <Card key={event.id} className="rounded-lg">
                <Link to={`/events/${event.id}/view`}>
                  <CardHeader className="text-lg font-bold">{event.title}</CardHeader>
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
    </main>
  );
}
