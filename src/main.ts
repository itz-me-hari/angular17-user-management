import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './app/store/users/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './app/store/users/users.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatSnackBarModule),
    provideStore({ users: usersReducer }),
    provideEffects([UsersEffects])
  ]
}).catch(err => console.error(err));
