import { createRoot } from "react-dom/client";
import "./styles/app.css";
import AuthenticatedApp from "./apps/AuthenticatedApp";
import { obterDeviceId } from "./lib/device-id";
import { scheduleGtagIdleLoad } from "./lib/gtag";

obterDeviceId();
scheduleGtagIdleLoad();

createRoot(document.getElementById("root")!).render(<AuthenticatedApp />);
