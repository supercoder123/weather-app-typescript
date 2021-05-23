export interface WeatherData {
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

export enum WeatherStates {
  "sn" = "Snow",
  "sl" = "Sleet",
  "h" = "Hail",
  "t" = "ThunderStorm",
  "hr" = "HeavyRain",
  "lr" = "LightRain",
  "s" = "Shower",
  "hc" = "HeavyCloud",
  "lc" = "LightCloud",
  "c" = "Clear"
}
