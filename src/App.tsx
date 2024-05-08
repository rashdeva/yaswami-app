import { Route, Routes } from "react-router-dom";
import Index from "./pages/page";
import EventsCreatePage from "./pages/events/create/page";
import EventPage from "./pages/events/edit/page";
import { useAuth } from "./hooks/useAuth";
import EventViewPage from "./pages/events/view/page";
import { useReroute } from "./hooks/useReroute";
import { useMiniApp } from "@tma.js/sdk-react";
import { useEffect } from "react";

function App() {
  useAuth();
  useReroute();

  const miniApp = useMiniApp();

  useEffect(() => {
    document.documentElement.classList.add('twa');
    miniApp.ready();
  }, []);

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
