"use client";

import { useState, useEffect, useCallback } from "react";

export const useTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [isClient, setIsClient] = useState(false);

  const updateTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    // Встановлюємо, що ми на клієнті
    setIsClient(true);
    // Встановлюємо активний стан
    setIsActive(true);
    
    // Оновлюємо час одразу
    updateTime();
    
    // Встановлюємо інтервал
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [updateTime]);

  // Повертаємо початкові значення під час SSR
  return { 
    currentTime: isClient ? currentTime : "00:00", 
    isActive: isClient ? isActive : false 
  };
};
