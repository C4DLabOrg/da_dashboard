import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReportsRoutes } from './reports.routing';
import { ReportsComponent } from './reports.component';
import { ViewSchoolsComponent } from '../schools/viewschools/viewschools.component';

import { SchoolsReportsComponent } from './schools/schoolsreport.component';
import { TeachersModule } from '../teachers/teachers.module';
import { TeachersReportComponent } from './teachers/teachersreport.component';
import { ChangepasswordComponent } from '../password/changepassword/changepassword.component';
import { ResetpasswordComponent } from '../password/resetpassword/resetpassword.component';
import { SocialComponent } from '../social/social.component';




@NgModule({
  imports: [CommonModule, RouterModule.forChild(ReportsRoutes), FormsModule, ReactiveFormsModule,MdInputModule,MdCardModule, MdInputModule, MdButtonModule, MdToolbarModule, MdTabsModule, MdListModule, MdSlideToggleModule, MdSelectModule, NgxDatatableModule, TeachersModule],
  declarations: [ SchoolsReportsComponent,SocialComponent, ChangepasswordComponent,ResetpasswordComponent,TeachersReportComponent, ReportsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ReportsModule {}
