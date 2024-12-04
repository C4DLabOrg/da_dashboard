import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TeachersComponent } from './teachers.component';
import { ViewTeachersComponent } from './viewteachers/viewteachers.component';
import { TeachersRoutes } from './teachers.routing';
import { AddTeachersComponent } from './addteachers/addteachers.component';
import { EditteacherComponent } from './editteachers/editteacher.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TeachersRoutes), MaterialModule, FlexLayoutModule, FormsModule,ReactiveFormsModule, NgxDatatableModule],
  declarations: [TeachersComponent,ViewTeachersComponent, AddTeachersComponent, EditteacherComponent],
  exports: [ ViewTeachersComponent ]

})

export class TeachersModule {}
