import { observer } from "mobx-react-lite";
import styles from "./humiditybar.module.scss";

export const HumidityBar = observer(({ percentage }) => {
  return (
    <div className={styles.bar}>
      <div className={styles.numbers}>
        <span className={styles.zero}>0</span>
        <span className={styles.fifty}>50</span>
        <span className={styles.hundred}>100</span>
      </div>
      <div className={styles.bars}>
        <div className={styles.backgroundBar}></div>
        <div
          className={styles.foregroundBar}
          style={{ width: percentage + "%" }}
        ></div>
      </div>
      <div className={styles.percentage}>%</div>
    </div>
  );
});
