"use client";

import { CircularCursor } from "./CircularCursor";
import { NavigationProgress } from "./NavigationProgress";

export const RootLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <NavigationProgress />
      <CircularCursor />
      {children}
    </div>
  );
}; 