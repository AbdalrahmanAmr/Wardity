import { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

interface DeliveryLocation {
  id: string;
  name: string;
  region: string;
}

const defaultLocations: DeliveryLocation[] = [
  { id: "cairo", name: "Greater Cairo", region: "Cairo-EG" },
  { id: "giza", name: "Giza", region: "Giza-EG" },
  { id: "alexandria", name: "Alexandria", region: "Alexandria-EG" },
];

interface DeliveryLocationContextType {
  location: DeliveryLocation;
  setLocation: (location: DeliveryLocation) => void;
  availableLocations: DeliveryLocation[];
}

const DeliveryLocationContext = createContext<DeliveryLocationContextType | undefined>(undefined);

interface DeliveryLocationProviderProps {
  children: ReactNode;
}

export const DeliveryLocationProvider: React.FC<DeliveryLocationProviderProps> = ({ children }) => {
  const defaultLocation = defaultLocations[0];
  if (!defaultLocation) {
    throw new Error("At least one default location must be defined");
  }
  const [location, setLocationState] = useLocalStorage<DeliveryLocation>(
    "wardity-delivery-location",
    defaultLocation
  );

  const setLocation = useCallback(
    (newLocation: DeliveryLocation) => {
      setLocationState(newLocation);
    },
    [setLocationState]
  );

  const value: DeliveryLocationContextType = {
    location,
    setLocation,
    availableLocations: defaultLocations,
  };

  return <DeliveryLocationContext.Provider value={value}>{children}</DeliveryLocationContext.Provider>;
};

export const useDeliveryLocation = (): DeliveryLocationContextType => {
  const context = useContext(DeliveryLocationContext);
  if (context === undefined) {
    throw new Error("useDeliveryLocation must be used within a DeliveryLocationProvider");
  }
  return context;
};

