import { Routes } from "@angular/router";

import { PromotionsComponent } from './promotions.component';
import { AuthGuard } from '../authguard/auth.guard';

export const PromotionsRoutes: Routes = [
  {
  path: '',
  component: PromotionsComponent,
  canActivate: [AuthGuard]
  }
];
