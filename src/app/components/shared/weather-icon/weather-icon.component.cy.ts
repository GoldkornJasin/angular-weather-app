import { provideTransloco } from '@ngneat/transloco';
import { WeatherIconComponent } from '@components/shared/weather-icon/weather-icon.component';

const providers = [
  provideTransloco({
    config: {},
    loader: undefined,
  }),
];

describe('WeatherIconComponent', () => {
  it('mounts', () => {
    cy.mount(WeatherIconComponent, {
      providers,
      componentProperties: {
        iconSrc: 'google.com',
      },
    });

    cy.get('img[src="google.com"]').should('exist');
  });
});
