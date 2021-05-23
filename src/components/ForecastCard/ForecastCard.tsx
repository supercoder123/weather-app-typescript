import styles from "./forecastCard.module.scss";
import { WeatherStates } from "../../stores/types";
import AppStore from "../../stores/AppStore";
import WeatherStore from "../../stores/WeatherStore";
import { observer } from "mobx-react-lite";
import { TemperatureUnit } from "../TemperatureUnit";

interface Forecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  abbr: string;
  index: number;
}

export const ForecastCard = observer(
  ({ date, minTemp, maxTemp, abbr, index }: Forecast) => {
    const imageName: WeatherStates =
      WeatherStates[abbr as keyof typeof WeatherStates];
console.log('render forecast card')
    if (AppStore.isLoading) {
      return <div>Loading..</div>;
    }

    return (
      <div
        className={styles.forecastCard}
        onClick={() => WeatherStore.updateDisplayWeatherFromForecast(index)}
      >
        <div className={styles.date}>{date}</div>
        <img src={require(`../../assets/${imageName}.png`)} alt="icon" />
        <div className={styles.temp}>
          <div className={styles.max}>
            <span>{Math.trunc(maxTemp)}</span>
            <TemperatureUnit />
          </div>
          <div className={styles.min}>
            <span>{Math.trunc(minTemp)}</span>
            <TemperatureUnit />
          </div>
        </div>
      </div>
    );
  }
);
