import { observer } from "mobx-react-lite";
import AppStore from "../../stores/AppStore";
import { Compass } from "../Compass/Compass";
import { HumidityBar } from "../HumidityBar/HumidityBar";
import styles from "./detailCard.module.scss";

function renderCardDetails(type: string) {
  const {
    wind_speed,
    wind_direction,
    humidity,
    wind_direction_compass,
    visibility,
    air_pressure
  } = AppStore.currentDisplayWeather;

  switch (type) {
    case "wind":
      return (
        <>
          <div className={styles.bigNum}>
            {Math.trunc(wind_speed)} <span className={styles.units}>mph</span>
          </div>
          <Compass
            degrees={wind_direction}
            direction={wind_direction_compass}
          />
        </>
      );
    case "humidity":
      return (
        <>
          <div className={styles.bigNum}>
            {humidity} <span className={styles.units}>%</span>
          </div>
          <HumidityBar percentage={humidity} />
        </>
      );
    case "visibility":
      return (
        <>
          <div className={styles.bigNum}>
            {Math.trunc(visibility)}{" "}
            <span className={styles.units}> miles</span>
          </div>
        </>
      );
    case "pressure":
      return (
        <>
          <div className={styles.bigNum}>
            {air_pressure} <span className={styles.units}>mb</span>
          </div>
        </>
      );
  }
}

export const DetailCard = observer(
  ({ title, type }: { title: string; type: string }) => {
    return (
      <div className={styles.detailCard}>
        <p className={styles.title}>{title}</p>
        {renderCardDetails(type)}
      </div>
    );
  }
);
