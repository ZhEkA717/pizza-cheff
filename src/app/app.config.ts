import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {provideTransloco} from '@jsverse/transloco';
import {TranslocoHttpLoader} from '@app/transloco-loader';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideTransloco({
      config: {
        availableLangs: ['ru', 'en'],
        defaultLang: 'ru',
        prodMode: !isDevMode()
      },
      loader: TranslocoHttpLoader
    }),
    provideAnimations(),
    provideEventPlugins(),
  ]
};
