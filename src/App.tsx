import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useReroute } from "./hooks/useReroute";
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, useMiniApp, useThemeParams, useViewport } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { RegisterPage } from "./pages/register/page";

import EventsPage from "./pages/events/page";
import EventEditPage from "./pages/events/edit/page";
import EventViewPage from "./pages/events/view/page";
import EventPayPage from "./pages/events/pay/page";
import MainPage from "./pages/page";

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
    miniApp.requestWriteAccess();
  }, []);

  return (
    <div className="container max-w-xl">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/create" element={<EventEditPage />} />
        <Route path="/events/:eventId" element={<EventEditPage />} />
        <Route path="/events/:eventId/view" element={<EventViewPage />} />
        <Route path="/events/:eventId/pay" element={<EventPayPage />} />
      </Routes>
    </div>
  );
}

export default App;
