import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import WeatherStore from "../../stores/WeatherStore";
import styles from "./styles.module.scss";
import cx from "classnames";
import { useEffect } from "react";

export const TemperatureToggle = observer(() => {
  useEffect(() => {
    reaction(
      () => WeatherStore.isCelcius,
      () => {
        WeatherStore.updateTemperatures();
      }
    );
  }, []);

  return (
    <div className={styles.toggle}>
      <button
        className={cx({ [styles.active]: WeatherStore.isCelcius })}
        onClick={() => {
          WeatherStore.setTemperatureUnitAsDegrees(true);
        }}
      >
        <span>&#8451;</span>
      </button>
      <button
        className={cx({ [styles.active]: !WeatherStore.isCelcius })}
        onClick={() => {
          WeatherStore.setTemperatureUnitAsDegrees(false);
        }}
      >
        <span>&#8457;</span>
      </button>
    </div>
  );
});
