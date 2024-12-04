import { Routes } from "@angular/router";

import { ViewSchoolsComponent } from './viewschools/viewschools.component';
import { AddSchoolsComponent } from './addschool/addschools.component';
import { EditschoolComponent } from './editschool/editschool.component';
import { AttendancesheetsComponent } from './attendancesheets/attendancesheets.component';
import { SchoolattendanceComponent } from './attendancesheets/schoolattendance/schoolattendance.component';


export const SchoolsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-schools',
      component: ViewSchoolsComponent
    },{
      path: 'add-schools',
      component: AddSchoolsComponent
    },{
      path: 'edit-school/:id',
      component: EditschoolComponent
    },{
      path: 'export-sheets',
      component: AttendancesheetsComponent
    }, {
      path: 'export-sheets/:id',
      component: SchoolattendanceComponent
    }
  ],
  }
]
