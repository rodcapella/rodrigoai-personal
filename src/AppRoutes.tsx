import type { ComponentType } from "react";
import { useRoutes } from "react-router-dom";
import { createRoutes } from "./routes";

interface AppRoutesProps {
  initialPath?: string;
  InitialComponent?: ComponentType;
}

export default function AppRoutes({
  initialPath,
  InitialComponent,
}: AppRoutesProps) {
  return useRoutes(createRoutes(initialPath, InitialComponent));
}
