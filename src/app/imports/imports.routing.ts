import { Routes } from "@angular/router";

import { ImportsComponent } from './imports.component';
import { AuthGuard } from '../authguard/auth.guard';

export const ImportsRoutes: Routes = [{
  path: '',
  component: ImportsComponent,
  canActivate: [AuthGuard]
}];
