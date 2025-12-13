"use client";

import { useSyncExternalStore } from "react";

export function useIsClient() {
  return useSyncExternalStore(
    () => () => {}, // no-op subscribe
    () => true,     // client snapshot
    () => false     // server snapshot
  );
}
