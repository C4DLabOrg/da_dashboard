import { Routes } from "@angular/router";
import { SchoolsReportsComponent } from './schools/schoolsreport.component';
import { TeachersReportComponent } from './teachers/teachersreport.component';
import { ChangepasswordComponent } from '../password/changepassword/changepassword.component';
import { ResetpasswordComponent } from '../password/resetpassword/resetpassword.component';
import { SocialComponent } from '../social/social.component';


export const ReportsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'schools',
      component:SchoolsReportsComponent
    },{
      path: 'change-password',
    component: ChangepasswordComponent
    },{
      path: 'reset-password',
      component: ResetpasswordComponent
    },{
      path: 'profile',
    component: SocialComponent
    },
    {
      path: 'teachers',
      component:TeachersReportComponent
    }
  ]
  }
];
