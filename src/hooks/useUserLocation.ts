import { useEffect, useState } from "react";
import { Geolocation } from "../stores/WeatherStore";

export function useUserLocation(): [Geolocation, string] {
  const [position, setPosition] = useState({} as Geolocation);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPosition({ latitude, longitude });
        },
        () => {
          setError("Can't get location data");
        }
      );
    }
  }, []);

  return [position, error];
}
