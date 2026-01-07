"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MainPage } from "@payload-types";
import { useNavigationStore } from "@store";

interface NavigationContextType {
  navigation: MainPage[];
  setNavigation: (navigation: MainPage[]) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: React.ReactNode;
  initialNavigation: MainPage[];
}

export const NavigationProvider = ({
  children,
  initialNavigation,
}: NavigationProviderProps) => {
  const { navigation, setNavigation } = useNavigationStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Ініціалізуємо навігацію серверними даними
  useEffect(() => {
    if (!isInitialized && initialNavigation.length > 0) {
      setNavigation(initialNavigation);
      setIsInitialized(true);
    }
  }, [initialNavigation, setNavigation, isInitialized]);

  const value = {
    navigation,
    setNavigation,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within NavigationProvider"
    );
  }
  return context;
};
