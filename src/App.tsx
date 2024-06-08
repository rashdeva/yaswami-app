import { Route, Routes } from "react-router-dom";
import Index from "./pages/page";
import EventEditPage from "./pages/events/edit/page";
import { useAuth } from "./hooks/useAuth";
import EventViewPage from "./pages/events/view/page";
import { useReroute } from "./hooks/useReroute";
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, useMiniApp, useThemeParams, useViewport } from "@tma.js/sdk-react";
import { useEffect } from "react";
import EventPayPage from "./pages/events/pay/page";

function App() {
  useAuth();
  useReroute();

  const themeParams = useThemeParams();
  const viewport = useViewport();
  const miniApp = useMiniApp();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    document.documentElement.classList.add('twa');
    miniApp.ready();
  }, []);

  return (
    <div className="container max-w-xl">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events/create" element={<EventEditPage />} />
        <Route path="/events/:eventId" element={<EventEditPage />} />
        <Route path="/events/:eventId/view" element={<EventViewPage />} />
        <Route path="/events/:eventId/pay" element={<EventPayPage />} />
      </Routes>
    </div>
  );
}

export default App;
