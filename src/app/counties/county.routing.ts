import { Routes } from "@angular/router";
import { CountyComponent } from './county.component';
import { AuthGuard } from '../authguard/auth.guard';


export const CountyRoutes: Routes = [{
  path: '',
  component: CountyComponent,
  canActivate: [AuthGuard]
}];
