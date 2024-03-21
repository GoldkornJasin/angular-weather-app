import { TimeSlot } from '@app/models/DayViewModel.model';
import { Hour } from '@app/api/data-contracts';

export default function mapHourToTimeSlot(hour: Hour): TimeSlot {
  return {
    icon: hour.condition?.icon ?? '',
    time: hour.time ?? '',
    temperatureCelsius: hour.temp_c ?? 0,
    feelsLikeCelsius: hour.feelslike_c ?? 0,
    windSpeedKpH: hour.wind_kph ?? 0,
    cloudinessPercent: hour.cloud ?? 0,
    chanceOfRainPercent: hour.chance_of_rain ?? 0,
  };
}
