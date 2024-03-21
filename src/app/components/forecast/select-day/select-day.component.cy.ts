import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideTransloco } from '@ngneat/transloco';
import { SelectDayComponent } from '@components/forecast/select-day/select-day.component';
import { DayViewModelModel } from '@app/models/DayViewModel.model';
import { createOutputSpy } from 'cypress/angular';

const providers = [
  provideRouter(routes),
  provideHttpClient(),
  DatePipe,
  provideTransloco({
    config: {},
    loader: undefined,
  }),
];

const mockForecastData: DayViewModelModel[] = [
  {
    maxTempCelsius: 20,
    minTempCelsius: 10,
    conditionIcon: 'google.com',
    date: '2024-03-21',
    aggregatedTimeSlots: [],
  },
  {
    maxTempCelsius: 21,
    minTempCelsius: 11,
    conditionIcon: 'google.com',
    date: '2024-03-22',
    aggregatedTimeSlots: [],
  },
  {
    maxTempCelsius: 22,
    minTempCelsius: 12,
    conditionIcon: 'google.com',
    date: '2024-03-23',
    aggregatedTimeSlots: [],
  },
];

describe('SelectDayComponent', () => {
  it('mounts', () => {
    cy.mount(SelectDayComponent, {
      providers,
      componentProperties: {
        forecastData: mockForecastData,
        selectedDay: 0,
      },
    });

    cy.get('[data-cy="selectable-day"]').its('length').should('eq', 3);
  });

  it('emits when a day is selected', () => {
    cy.mount(SelectDayComponent, {
      providers,
      componentProperties: {
        forecastData: mockForecastData,
        selectedDay: 0,
        daySelected: createOutputSpy('daySelected'),
      },
    });

    cy.get('[data-cy="selectable-day"]').eq(2).click();
    cy.get('@daySelected').should('have.been.calledOnceWith', 2);
  });
});
