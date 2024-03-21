import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DayViewModelModel } from '@app/models/DayViewModel.model';
import { DatePipe, NgForOf } from '@angular/common';
import { WeatherIconComponent } from '@components/shared/weather-icon/weather-icon.component';

@Component({
  selector: 'app-select-day',
  standalone: true,
  imports: [DatePipe, WeatherIconComponent, NgForOf],
  templateUrl: './select-day.component.html',
  styleUrl: './select-day.component.scss',
})
export class SelectDayComponent {
  @Input() public forecastData!: DayViewModelModel[];
  @Input() public selectedDay!: number;

  @Output() public daySelected = new EventEmitter<number>();
}
