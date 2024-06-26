import { useParams } from "react-router-dom";
import { useBack } from "~/hooks/useBack";
import { EventForm } from "./event-form";

export default function EventPage() {
  useBack("/");
  const { eventId } = useParams();

  return (
    <div className="container py-8">
      <EventForm eventId={eventId} />
    </div>
  );
}
