import { lazy } from "react";

export const Mail = lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Mail }))
);
export const Phone = lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Phone }))
);
export const MapPin = lazy(() =>
  import("lucide-react").then((m) => ({ default: m.MapPin }))
);
export const Send = lazy(() =>
  import("lucide-react").then((m) => ({ default: m.Send }))
);
export const CheckCircle = lazy(() =>
  import("lucide-react").then((m) => ({ default: m.CheckCircle }))
);
export const AlertCircle = lazy(() =>
  import("lucide-react").then((m) => ({ default: m.AlertCircle }))
);
