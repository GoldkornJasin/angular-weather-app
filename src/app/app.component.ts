import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInputComponent } from '@components/user-input/user-input.component';
import SearchStartedEvent from '@components/user-input/SearchStartedEvent';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { WeatherInfoService } from '@services/weather-info.service';
import { Location } from '@app/api/data-contracts';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  ReplaySubject,
} from 'rxjs';
import { CurrentWeatherVM } from '@app/models/CurrentWeatherVM';
import { DayViewModelModel } from '@app/models/DayViewModel.model';
import { CurrentWeatherComponent } from '@components/current-weather/current-weather.component';
import { ForecastComponent } from '@components/forecast/forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserInputComponent,
    DatePipe,
    CurrentWeatherComponent,
    AsyncPipe,
    NgIf,
    ForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public currentData$ = new ReplaySubject<CurrentWeatherVM>(1);
  public forecastData$ = new ReplaySubject<DayViewModelModel[]>(1);
  public locationData$ = new ReplaySubject<Location>(1);

  public isLoading$ = new BehaviorSubject<boolean>(false);

  public isLoadingDebounced$ = this.isLoading$.pipe(
    debounceTime(50),
    distinctUntilChanged(),
  );

  public startDate;
  public place = 'Heidelberg';

  constructor(
    private readonly weatherInfoService: WeatherInfoService,
    readonly datePipe: DatePipe,
  ) {
    this.startDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  public ngOnInit() {
    void this.searchStarted({ place: this.place, date: this.startDate ?? '' });
  }

  public async searchStarted({ place, date }: SearchStartedEvent) {
    this.isLoading$.next(true);

    this.startDate = date;
    this.place = place;

    const result = await this.weatherInfoService
      .requestWeatherData(this.place, this.startDate)
      .catch((error) => {
        // TODO: Errorhandling in UI
        console.error(error);
        alert('Fehler beim Laden der Wetterinformation');
        this.isLoading$.next(false);
      });

    if (!result) return;

    const { location, current, forecast } = result;
    this.currentData$.next(current);
    this.locationData$.next(location);
    this.forecastData$.next(forecast);
    this.isLoading$.next(false);
  }
}
