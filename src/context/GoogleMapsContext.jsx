import { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { businessInfo } from "../data/vehicles";

const libraries = ["places"];

const GoogleMapsContext = createContext({ isLoaded: false });

export function GoogleMapsProvider({ children }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: businessInfo.googleApiKey,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
