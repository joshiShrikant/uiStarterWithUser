import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';
import { MaterialModule } from './coreModules/material.module';
import { SharedModule } from './shared/shared-module';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    importProvidersFrom(MaterialModule, SharedModule, RouterModule),
  ]
};
