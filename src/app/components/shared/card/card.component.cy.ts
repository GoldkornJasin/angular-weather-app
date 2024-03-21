import { provideTransloco } from '@ngneat/transloco';
import { CardComponent } from '@components/shared/card/card.component';

const providers = [
  provideTransloco({
    config: {},
    loader: undefined,
  }),
];

describe('CardComponent', () => {
  it('mounts', () => {
    cy.mount(CardComponent, { providers });
    cy.get('[data-cy="card"]').should('be.visible');
  });

  it('No title & subtitle per default', () => {
    cy.mount(CardComponent, { providers });
    cy.get('[data-cy="title"]').should('not.exist');
    cy.get('[data-cy="subtitle"]').should('not.exist');
  });

  it('Shows title without subtitle', () => {
    cy.mount(CardComponent, {
      providers,
      componentProperties: {
        title: 'hello',
      },
    });
    cy.get('[data-cy="title"]').should('be.visible').contains('hello');
    cy.get('[data-cy="subtitle"]').should('not.exist');
  });

  it('Shows title & subtitle', () => {
    cy.mount(CardComponent, {
      providers,
      componentProperties: {
        title: 'hello',
        subtitle: 'world',
      },
    });
    cy.get('[data-cy="title"]').should('be.visible').contains('hello');
    cy.get('[data-cy="subtitle"]').should('be.visible').contains('world');
  });

  it('Shows loading overlay', () => {
    cy.mount(CardComponent, {
      providers,
      componentProperties: {
        isLoading: false,
      },
    });
    cy.get('[data-cy="loading-overlay"]').should('not.exist');

    cy.mount(CardComponent, {
      providers,
      componentProperties: {
        isLoading: true,
      },
    });
    cy.get('[data-cy="loading-overlay"]').should('be.visible');
  });
});
