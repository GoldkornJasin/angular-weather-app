import { UserInputComponent } from '@components/user-input/user-input.component';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideTransloco } from '@ngneat/transloco';
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

describe('UserInputComponent', () => {
  it('mounts', () => {
    cy.mount(UserInputComponent, {
      providers,
    });

    cy.get('app-card form');
  });

  it('emits when search is started', () => {
    cy.mount(UserInputComponent, {
      providers,
      componentProperties: {
        searchStarted: createOutputSpy('searchStarted'),
      },
    });

    cy.get('input[type="date"]').type('2024-03-21');
    cy.get('input[type="text"]').type('heidelberg');
    cy.get('button[type="submit"]').click();
    cy.get('@searchStarted').should('have.been.calledWith', {
      date: '2024-03-21',
      place: 'heidelberg',
    });
  });

  it('accepts default values', () => {
    cy.mount(UserInputComponent, {
      providers,
      componentProperties: {
        date: '2024-03-21',
        place: 'Heidelberg',
      },
    });

    cy.get('input[type="date"]').should('have.value', '2024-03-21');
    cy.get('input[type="text"]').should('have.value', 'Heidelberg');
  });

  it('shows loading state', () => {
    cy.mount(UserInputComponent, {
      providers,
      componentProperties: {},
    });

    cy.get('[data-cy="loading-overlay"]').should('not.exist');

    cy.mount(UserInputComponent, {
      providers,
      componentProperties: {
        isLoading: true,
      },
    });

    cy.get('[data-cy="loading-overlay"]').should('be.visible');
  });
});
