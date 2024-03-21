import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [],
  templateUrl: './weather-icon.component.html',
})
export class WeatherIconComponent {
  @Input() public iconSrc = '';
}
