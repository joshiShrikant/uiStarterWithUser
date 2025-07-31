import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withHashLocation } from '@angular/router';

import { appRoutes } from './app.routes';
import { MaterialModule } from './coreModules/material.module';
import { SharedModule } from './shared/shared-module';
import { provideHttpClient } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideHttpClient(),
    provideRouter(appRoutes, withHashLocation()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    importProvidersFrom(MaterialModule, SharedModule, RouterModule),
  ]
};
