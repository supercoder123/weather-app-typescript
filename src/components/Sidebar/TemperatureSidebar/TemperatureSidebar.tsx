// import WeatherStore from "../../../stores/WeatherStore";
import AppStore from "../../../stores/AppStore";
import { observer } from "mobx-react-lite";
import styles from "./temperatureSidebar.module.scss";
import WeatherStore from "../../../stores/WeatherStore";
import { WeatherStates } from "../../../stores/types";
import { TemperatureUnit } from "../../TemperatureUnit";

export const TemperatureSidebar = observer(() => {
  const {
    weather_state_name,
    weather_state_abbr,
    applicable_date,
    the_temp
  } = AppStore.currentDisplayWeather;
  console.log("render sidebar", the_temp);

  const imageName: WeatherStates =
    WeatherStates[weather_state_abbr as keyof typeof WeatherStates];

  if (AppStore.isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className={styles.imgContainer}>
        <img
          className={styles.wheatherIcon}
          src={require(`../../../assets/${imageName}.png`)}
          alt="Weather Icon"
        />
      </div>

      <p className={styles.temp}>
        {Math.trunc(the_temp)} <TemperatureUnit />
      </p>
      <p className={styles.weatherStateName}>{weather_state_name}</p>
      <div className={styles.moreDetails}>
        <p>{applicable_date}</p>
      </div>
      <p className={styles.place}>
        <span className="material-icons">place</span>
        {WeatherStore.currentLocationInfo.title}
      </p>
    </div>
  );
});
