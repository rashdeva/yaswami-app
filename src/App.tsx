import { Route, Routes } from "react-router-dom";
import Index from "./pages";
import EventsCreatePage from "./pages/events-create";
import EventPage from "./pages/events-edit";
import { useAuth } from "./hooks/useAuth";

function App() {
  useAuth();

  return (
    <div className="container max-w-xl">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events/create" element={<EventsCreatePage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
      </Routes>
    </div>
  );
}

export default App;
