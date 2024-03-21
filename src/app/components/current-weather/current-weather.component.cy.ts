import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideTransloco } from '@ngneat/transloco';
import { CurrentWeatherComponent } from '@components/current-weather/current-weather.component';

const providers = [
  provideRouter(routes),
  provideHttpClient(),
  DatePipe,
  provideTransloco({
    config: {},
    loader: undefined,
  }),
];

const currentWeatherMock = {
  temperatureCelsius: 10,
  feelsLikeCelsius: 20,
  windSpeedKpH: 30,
  windSpeedDirection: 'SHW',
  cloudinessPercent: 40,
  chanceOfRainPercent: 50,
  icon: '',
};

describe('CurrentWeatherComponent', () => {
  it('mounts', () => {
    cy.mount(CurrentWeatherComponent, {
      providers,
      componentProperties: {
        currentWeather: currentWeatherMock,
      },
    });

    cy.get('app-card').contains('10°C');
  });

  it('Shows loading overlay', () => {
    cy.mount(CurrentWeatherComponent, {
      providers,
      componentProperties: {
        currentWeather: currentWeatherMock,
        isLoading: false,
      },
    });

    cy.get('[data-cy="loading-overlay"]').should('not.exist');

    cy.mount(CurrentWeatherComponent, {
      providers,
      componentProperties: {
        currentWeather: currentWeatherMock,
        isLoading: true,
      },
    });

    cy.get('[data-cy="loading-overlay"]').should('be.visible');
  });
});
