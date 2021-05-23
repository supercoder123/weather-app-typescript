import { observer } from "mobx-react-lite";
import styles from "./compass.module.scss";

export const Compass = observer(
  ({ degrees, direction }: { degrees: number; direction: string }) => {
    return (
      <div className={styles.compass}>
        <div className={styles.pointer}>
          <span
            className={"material-icons"}
            style={{ transform: `rotate(${degrees}deg)` }}
          >
            navigation
          </span>
        </div>
        <div className={styles.direction}>{direction.toUpperCase()}</div>
      </div>
    );
  }
);
