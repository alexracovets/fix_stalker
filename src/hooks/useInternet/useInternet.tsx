"use client";

import { useState, useEffect, useCallback } from "react";

export const useInternet = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  useEffect(() => {
    setIsClient(true);
    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return isClient ? isOnline : false;
};
