import { Routes } from "@angular/router";
import { AuthGuard } from '../authguard/auth.guard';

import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewpartnersComponent } from './viewpartners/viewpartners.component';
import { AttendancepartnersComponent } from './attendancepartners/attendancepartners.component';
import { PartnersComponent } from './partners.component';


export const PartnersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-partners',
      component: ViewpartnersComponent
    },{
      path: 'add-partner',
      component: AddPartnerComponent
    }, {
      path: 'partner/:id',
      component: PartnersComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'attendance-partners',
      component: AttendancepartnersComponent,
      canActivate: [AuthGuard]
    }
  ],
  }
]
