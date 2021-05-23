import { makeAutoObservable } from "mobx";
import { WeatherData } from "./types";
import axios from "axios";
import Constants from "../constants";
import AppStoreInstance, { AppStore } from "./AppStore";

interface LocationInfo {
  woeid: number;
  title: string;
}

interface TempDetails {
  min_temp: number;
  max_temp: number;
  the_temp: number;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

class WeatherStore {
  public todaysWeather: WeatherData = {} as WeatherData;
  public currentLocationInfo: LocationInfo = {} as LocationInfo;
  public fiveDayPredictions: WeatherData[] = [];
  isLoading = false;
  private appStore: AppStore = AppStoreInstance;
  isCelcius: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.appStore = AppStoreInstance;
  }

  async fetchLocationByLatLong(coordinates: Geolocation) {
    const response = await axios.get(
      `https://intense-hollows-87072.herokuapp.com/${Constants.baseURL}location/search?lattlong=${coordinates.latitude},${coordinates.longitude}`
    );
    this.currentLocationInfo = response.data[0];
  }

  async fetchWeatherData(position: Geolocation) {
    this.appStore.setIsLoading(true);
    await this.fetchLocationByLatLong(position);

    const response = await axios.get(
      `https://intense-hollows-87072.herokuapp.com/${Constants.baseURL}location/${this.currentLocationInfo.woeid}`
    );
    [
      this.todaysWeather,
      ...this.fiveDayPredictions
    ] = response.data.consolidated_weather;

    this.todaysWeather.applicable_date = "Today";
    this.fiveDayPredictions[0].applicable_date = "Tomorrow";

    this.appStore.setCurrentDisplayWeather(this.todaysWeather);
    this.appStore.setIsLoading(false);
  }

  updateDisplayWeatherFromForecast(index: number) {
    this.appStore.currentDisplayWeather = this.fiveDayPredictions[index];
  }

  setTemperatureUnitAsDegrees(flag: boolean) {
    this.isCelcius = flag;
  }

  degreesToF(deg: number) {
    return Math.trunc(deg * 1.8) + 32;
  }

  farenheightToDegrees(f: number) {
    return Math.trunc((f - 32) * 0.5556);
  }

  convert(temp: number) {
    return !this.isCelcius
      ? this.degreesToF(temp)
      : this.farenheightToDegrees(temp);
  }

  updateTemperatures() {
    this.appStore.setCurrentDisplayWeather(
      this.convertTemperatureUnits(this.appStore.currentDisplayWeather)
    );
    this.convertForecastTemperatures();
  }

  convertTemperatureUnits(temp: WeatherData) {
    let tempObject: TempDetails = {} as TempDetails;
    const allowedProperties = ["max_temp", "the_temp", "min_temp"];
    for (let [key, value] of Object.entries(temp)) {
      if (allowedProperties.includes(key)) {
        tempObject[key as keyof TempDetails] = this.convert(value);
      }
    }
    const updatedTemp = {
      ...temp,
      ...tempObject
    };
    return updatedTemp;
  }

  convertForecastTemperatures() {
    this.fiveDayPredictions = this.fiveDayPredictions.map((tempObj) => {
      return this.convertTemperatureUnits(tempObj);
    });
  }
}

export default new WeatherStore();
