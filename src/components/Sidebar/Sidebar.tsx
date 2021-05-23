import styles from "./sidebar.module.scss";
import { TemperatureSidebar } from "./TemperatureSidebar";
import { SearchSidebar } from "./SearchSidebar";
import AppStore from "../../stores/AppStore";
import WeatherStore from "../../stores/WeatherStore";
import { observer } from "mobx-react-lite";

export const Sidebar = observer(() => {
  return (
    <div className={styles.sidebar}>
      <button onClick={() => AppStore.toggleSidebar()}>click</button>
      {AppStore.isSearchModeOn ? <SearchSidebar /> : <TemperatureSidebar />}
    </div>
  );
});
