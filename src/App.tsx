import styles from "./app.module.scss";
import { useUserLocation } from "./hooks/useUserLocation";
import { useEffect } from "react";
import WeatherStore from "./stores/WeatherStore";
import { Sidebar } from "./components/Sidebar";
import { WeatherDetails } from "./components/WeatherDetails";
import { observer } from "mobx-react-lite";

function isEmpty(obj: Object) {
  for (var i in obj) return false;
  return true;
}

export default observer(() => {
  const [position, error] = useUserLocation();

  useEffect(() => {
    if (!isEmpty(position) && !error) {
      WeatherStore.fetchWeatherData(position);
    }
  }, [position]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <WeatherDetails />
    </div>
  );
});
