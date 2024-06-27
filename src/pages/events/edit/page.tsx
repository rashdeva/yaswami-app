import { useParams } from "react-router-dom";
import { useBack } from "~/hooks/useBack";
import { EventForm } from "./event-form";

export default function EventPage() {
  useBack("/events");
  const { eventId } = useParams();

  return (
    <div className="py-6">
      <EventForm eventId={eventId} />
    </div>
  );
}
