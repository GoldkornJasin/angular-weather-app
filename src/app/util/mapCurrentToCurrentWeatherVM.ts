import { Current, Hour } from '@app/api/data-contracts';
import { CurrentWeatherVM } from '@app/models/CurrentWeatherVM';

// The current weather data does not include the probability of rain. Therefore we use the information from the latest forecast timeslot
export default function mapCurrentToCurrentWeatherVM(
  current: Current | undefined,
  hour: Hour | undefined,
): CurrentWeatherVM | undefined {
  if (current == undefined) return undefined;

  return {
    temperatureCelsius: current.temp_c ?? 0,
    feelsLikeCelsius: current.feelslike_c ?? 0,
    windSpeedKpH: current.wind_kph ?? 0,
    windSpeedDirection: current.wind_dir ?? '',
    cloudinessPercent: current.cloud ?? 0,
    chanceOfRainPercent: hour?.chance_of_rain ?? 0,
    icon: current.condition?.icon ?? '',
  };
}
