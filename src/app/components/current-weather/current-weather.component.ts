import { Component, Input } from '@angular/core';
import { CurrentWeatherVM } from '@app/models/CurrentWeatherVM';
import { CardComponent } from '@components/shared/card/card.component';
import { WeatherIconComponent } from '@components/shared/weather-icon/weather-icon.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { Location } from '@app/api/data-contracts';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CardComponent, WeatherIconComponent, TranslocoPipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  @Input() public currentWeather!: CurrentWeatherVM;
  @Input() public location!: Location | null;
  @Input() public isLoading!: boolean;
}
