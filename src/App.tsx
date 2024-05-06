import { Route, Routes } from "react-router-dom";
import Index from "./pages/page";
import EventsCreatePage from "./pages/events/create/page";
import EventPage from "./pages/events/edit/page";
import { useAuth } from "./hooks/useAuth";
import EventViewPage from "./pages/events/view/page";
import { useReroute } from "./hooks/useReroute";

function App() {
  useAuth();
  useReroute();
  
  return (
    <div className="container max-w-xl">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events/create" element={<EventsCreatePage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/events/:eventId/view" element={<EventViewPage />} />
      </Routes>
    </div>
  );
}

export default App;
