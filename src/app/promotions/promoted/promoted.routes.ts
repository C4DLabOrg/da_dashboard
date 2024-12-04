import { Routes } from "@angular/router";

import { PromotedComponent } from './promoted.component';
import { AuthGuard } from '../../authguard/auth.guard';

export const PromotedRoutes: Routes = [
  {
  path: '',
  component: PromotedComponent,
  canActivate: [AuthGuard]
  }
];
