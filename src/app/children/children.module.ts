import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { ChildrenRoutes } from './children.routing';
import { ChildrenComponent } from './children.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ChildComponent } from './individual/child.component';
import { AddChildrenComponent } from './addchildren/addchildren.component';
import { SchoolchildrenComponent } from './Schoolchildren/schoolchildren.component';
import { SchoolenrollmentComponent } from './Schoolenrollment/schoolenrollment.component';
import { ExportattendanceComponent } from './exportattendance/exportattendance.component';
import { EditchildComponent } from './editchild/editchild.component';
import { DropoutsComponent } from './dropouts/dropouts.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ChildrenRoutes),Ng2AutoCompleteModule,ChartsModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ChildrenComponent, AddChildrenComponent, EditchildComponent,SchoolenrollmentComponent, EnrollmentComponent, ChildComponent,SchoolchildrenComponent,ExportattendanceComponent,DropoutsComponent]
})

export class ChildrenModule {}
