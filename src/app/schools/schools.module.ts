import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '@angular/material';

import {CapitalizePipe} from "../pipes/capitalize.pipe";

import { SchoolsRoutes } from './schools.routing';
import { AddSchoolsComponent } from './addschool/addschools.component';
import { EditschoolComponent } from './editschool/editschool.component';
import { ViewSchoolsComponent } from './viewschools/viewschools.component';
import { SchoolattendanceComponent } from './attendancesheets/schoolattendance/schoolattendance.component';
import { AttendancesheetsComponent } from './attendancesheets/attendancesheets.component';

@NgModule({
  imports: [MaterialModule, CommonModule, RouterModule.forChild(SchoolsRoutes), MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ AddSchoolsComponent,EditschoolComponent, ViewSchoolsComponent,SchoolattendanceComponent,AttendancesheetsComponent,CapitalizePipe]
})

export class SchoolsModule {}
