import { makeAutoObservable } from "mobx";
import { WeatherData } from "./types";

class AppStore {
  isSearchModeOn = false;
  currentDisplayWeather: WeatherData = {} as WeatherData;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar() {
    this.isSearchModeOn = !this.isSearchModeOn;
  }

  setIsLoading(flag: boolean) {
    this.isLoading = flag;
  }

  setCurrentDisplayWeather(data: WeatherData) {
    this.currentDisplayWeather = data;
  }
}

export default new AppStore();
