import { Component, Input } from '@angular/core';
import { CardComponent } from '@components/shared/card/card.component';
import { DayViewModelModel } from '@app/models/DayViewModel.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { WeatherIconComponent } from '@components/shared/weather-icon/weather-icon.component';
import { SelectDayComponent } from '@components/forecast/select-day/select-day.component';
import { Location } from '@app/api/data-contracts';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CardComponent,
    NgIf,
    TranslocoPipe,
    DatePipe,
    WeatherIconComponent,
    SelectDayComponent,
    NgForOf,
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent {
  @Input() public forecastData!: DayViewModelModel[];
  @Input() public isLoading!: boolean;
  @Input() public location!: Location | null;

  public selectedDayIndex = 0;
}
