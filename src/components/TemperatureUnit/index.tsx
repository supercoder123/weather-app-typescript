import { observer } from "mobx-react-lite";
import WeatherStore from "../../stores/WeatherStore";

export const TemperatureUnit = observer(() => {
  return (
    <>
      {WeatherStore.isCelcius && <span>&#8451;</span>}
      {!WeatherStore.isCelcius && <span>&#8457;</span>}
    </>
  );
});
