import { CurrentWeatherVM } from '@app/models/CurrentWeatherVM';
import { Location } from '@app/api/data-contracts';

export interface TimeSlot {
  time: string;
  icon: string;
  temperatureCelsius: number;
  feelsLikeCelsius: number;
  windSpeedKpH: number;
  cloudinessPercent: number;
  chanceOfRainPercent: number;
}

export interface DayViewModelModel {
  maxTempCelsius: number;
  minTempCelsius: number;
  conditionIcon: string;
  date: string;
  aggregatedTimeSlots: TimeSlot[];
}

export interface WeatherInformation {
  location: Location;
  current: CurrentWeatherVM;
  forecast: DayViewModelModel[];
}
