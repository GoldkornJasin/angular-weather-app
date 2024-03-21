import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideTransloco } from '@ngneat/transloco';
import { DayViewModelModel, TimeSlot } from '@app/models/DayViewModel.model';
import { ForecastComponent } from '@components/forecast/forecast.component';

const providers = [
  provideRouter(routes),
  provideHttpClient(),
  DatePipe,
  provideTransloco({
    config: {},
    loader: undefined,
  }),
];

const mockTimeSlots: TimeSlot[] = [
  {
    time: '00-06',
    icon: '',
    temperatureCelsius: 20,
    feelsLikeCelsius: 21,
    windSpeedKpH: 22,
    cloudinessPercent: 50,
    chanceOfRainPercent: 51,
  },
  {
    time: '06-12',
    icon: '',
    temperatureCelsius: 20,
    feelsLikeCelsius: 21,
    windSpeedKpH: 22,
    cloudinessPercent: 50,
    chanceOfRainPercent: 51,
  },
  {
    time: '12-18',
    icon: '',
    temperatureCelsius: 20,
    feelsLikeCelsius: 21,
    windSpeedKpH: 22,
    cloudinessPercent: 50,
    chanceOfRainPercent: 51,
  },
  {
    time: '18-24',
    icon: '',
    temperatureCelsius: 20,
    feelsLikeCelsius: 21,
    windSpeedKpH: 22,
    cloudinessPercent: 50,
    chanceOfRainPercent: 51,
  },
];

const mockForecastData: DayViewModelModel[] = [
  {
    maxTempCelsius: 20,
    minTempCelsius: 10,
    conditionIcon: 'google.com',
    date: '2024-03-21',
    aggregatedTimeSlots: mockTimeSlots,
  },
  {
    maxTempCelsius: 20,
    minTempCelsius: 10,
    conditionIcon: 'google.com',
    date: '2024-03-22',
    aggregatedTimeSlots: mockTimeSlots,
  },
];

describe('ForecastComponent', () => {
  it('mounts', () => {
    cy.mount(ForecastComponent, {
      providers,
      componentProperties: {
        forecastData: mockForecastData,
        isLoading: false,
      },
    });

    cy.get('[data-cy="time-slot-detail"]').its('length').should('eq', 4);
    cy.get('[data-cy="time-slot-detail"]').should('be.visible');
  });

  it('Let the user select a day', () => {
    cy.mount(ForecastComponent, {
      providers,
      componentProperties: {
        forecastData: mockForecastData,
        isLoading: false,
      },
    });

    cy.get('[data-cy="selectable-day"]').eq(1).click();
  });

  it('Shows loading overlay', () => {
    cy.mount(ForecastComponent, {
      providers,
      componentProperties: {
        forecastData: mockForecastData,
        isLoading: false,
      },
    });

    cy.get('[data-cy="loading-overlay"]').should('not.exist');

    cy.mount(ForecastComponent, {
      providers,
      componentProperties: {
        forecastData: mockForecastData,
        isLoading: true,
      },
    });

    cy.get('[data-cy="loading-overlay"]').should('be.visible');
  });
});
