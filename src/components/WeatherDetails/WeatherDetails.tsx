import styles from "./weatherDetails.module.scss";
import WeatherStore from "../../stores/WeatherStore";
import AppStore from "../../stores/AppStore";
import { ForecastCard } from "../ForecastCard/ForecastCard";
import { observer } from "mobx-react-lite";
import { HumidityBar } from "../HumidityBar/HumidityBar";
import { DetailCard } from "../DetailCard/DetailCard";
import { Compass } from "../Compass/Compass";
import { TemperatureToggle } from "../TemperatureToggle";

export const WeatherDetails = observer(() => {
  if (AppStore.isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className={styles.content}>
      <div className="temperature-toggle">
        <TemperatureToggle />
      </div>
      <div className={styles.row}>
        {WeatherStore.fiveDayPredictions.map((info, i) => {
          return (
            <ForecastCard
              index={i}
              key={info.created}
              date={info.applicable_date}
              minTemp={info.min_temp}
              maxTemp={info.max_temp}
              abbr={info.weather_state_abbr}
            />
          );
        })}
      </div>
      <h3>Todays Highlights</h3>
      <div className={styles.details}>
        <DetailCard title="Wind Status" type="wind" />
        <DetailCard title="Humidity" type="humidity" />
        <DetailCard title="Visibility" type="visibility" />
        <DetailCard title="Air Pressure" type="pressure" />
      </div>
    </div>
  );
});
