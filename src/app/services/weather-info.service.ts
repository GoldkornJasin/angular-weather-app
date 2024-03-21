import { Injectable } from '@angular/core';
import { ForecastJson } from '@app/api/ForecastJson';
import { environment } from '../../environments/environment';
import { Forecast } from '@app/api/data-contracts';
import { DatePipe } from '@angular/common';
import {
  DayViewModelModel,
  TimeSlot,
  WeatherInformation,
} from '@app/models/DayViewModel.model';
import mapHourToTimeSlot from '@app/util/mapHourToTimeSlot';
import roundNumber from '@app/util/roundNumber';
import mapCurrentToCurrentWeatherVM from '@app/util/mapCurrentToCurrentWeatherVM';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private readonly datePipe: DatePipe) {}

  public async requestWeatherData(
    place: string,
    startDate: string,
  ): Promise<WeatherInformation> {
    /*The API distinguishes between data for the next 14 days and data beyond that.
     * Since we need data for the 3 days from the date for our UI, we need to check whether the requested date is 11 or fewer days in the future.
     * */
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (startDate !== currentDate) {
      throw 'Unimplemented';
    }

    const result = await new ForecastJson().forecastWeather({
      q: place,
      days: 3,
      key: environment.apiKey,
    });

    const { location, current, forecast } = result.data;

    const aggregatedForecast = this.mapForecast(forecast);
    const currentWeatherVM = mapCurrentToCurrentWeatherVM(
      current,
      forecast?.forecastday?.[0]?.hour?.[0],
    );

    if (!location) throw "Couldn't collect location information";

    if (!currentWeatherVM) throw "Couldn't collect current weather information";

    if (!aggregatedForecast) throw "Couldn't collect forecast data";

    return {
      location,
      current: currentWeatherVM,
      forecast: aggregatedForecast,
    };
  }

  private mapForecast(
    forecast: Forecast | undefined,
  ): DayViewModelModel[] | undefined {
    if (forecast?.forecastday?.length !== 3) return undefined;

    const days = forecast.forecastday;
    return days.map((day, key) => {
      let timeSlots: TimeSlot[] = day.hour?.map(mapHourToTimeSlot) ?? [];

      // Last slot should include data of the next day till 6 a.m.
      const isLastDay = key + 1 === days.length;
      if (!isLastDay) {
        const nextDay = days[key + 1];
        const firstSixHours = nextDay.hour?.slice(0, 6);
        const firstSixSlots = firstSixHours?.map(mapHourToTimeSlot) ?? [];
        timeSlots = [...timeSlots, ...firstSixSlots];
      }

      return {
        date: day.date ?? '',
        conditionIcon: day.day?.condition?.icon ?? '',
        maxTempCelsius: roundNumber(day.day?.maxtemp_c ?? 0, 0),
        minTempCelsius: roundNumber(day.day?.mintemp_c ?? 0, 0),
        aggregatedTimeSlots: this.aggregateTimeSlots(timeSlots),
      };
    });
  }

  private aggregateTimeSlots(timeSlots: TimeSlot[]): TimeSlot[] {
    const emptyTimeSlot: TimeSlot = {
      icon: '',
      time: '',
      temperatureCelsius: 0,
      feelsLikeCelsius: 0,
      windSpeedKpH: 0,
      cloudinessPercent: 0,
      chanceOfRainPercent: 0,
    };

    const aggregatedData = [
      { count: 0, ...emptyTimeSlot }, // 06-12
      { count: 0, ...emptyTimeSlot }, // 12-18
      { count: 0, ...emptyTimeSlot }, // 18-22
      { count: 0, ...emptyTimeSlot }, // 22-00
    ];

    timeSlots.forEach((hour) => {
      const hourOfDay = new Date(hour.time ?? '').getHours();

      let groupIndex: number;
      if (hourOfDay >= 6 && hourOfDay < 12) {
        groupIndex = 0;
      } else if (hourOfDay >= 12 && hourOfDay < 18) {
        groupIndex = 1;
      } else if (hourOfDay >= 18 && hourOfDay < 22) {
        groupIndex = 2;
      } else {
        groupIndex = 3;
      }

      // Aggregate the data
      const group = aggregatedData[groupIndex];
      group.count++;
      group.icon = hour.icon;
      group.temperatureCelsius += hour.temperatureCelsius ?? 0;
      group.feelsLikeCelsius += hour.feelsLikeCelsius ?? 0;
      group.windSpeedKpH += hour.windSpeedKpH ?? 0;
      group.cloudinessPercent += hour.cloudinessPercent ?? 0;
      group.chanceOfRainPercent += hour.chanceOfRainPercent ?? 0;
    });

    const labels = ['06-12', '12-18', '18-22', '22-06'];

    // Calculate averages for each group
    return aggregatedData.map((group, key) => ({
      icon: group.icon,
      time: labels[key],
      temperatureCelsius: roundNumber(
        group.temperatureCelsius / group.count,
        0,
      ),
      feelsLikeCelsius: roundNumber(group.feelsLikeCelsius / group.count, 0),
      windSpeedKpH: roundNumber(group.windSpeedKpH / group.count, 0),
      cloudinessPercent: roundNumber(group.cloudinessPercent / group.count, 1),
      chanceOfRainPercent: roundNumber(
        group.chanceOfRainPercent / group.count,
        1,
      ),
    }));
  }
}
