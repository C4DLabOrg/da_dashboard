import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { PartnersRoutes } from './partners.routing';
import { AddPartnerComponent } from './addpartner/addpartner.component';
import { ViewpartnersComponent } from './viewpartners/viewpartners.component';
import { AttendancepartnersComponent } from './attendancepartners/attendancepartners.component';
import { PartnersComponent } from './partners.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(PartnersRoutes), MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,ChartsModule,NgxDatatableModule],
  declarations: [ AddPartnerComponent, ViewpartnersComponent, PartnersComponent,AttendancepartnersComponent ]
})

export class PartnersModule {}
