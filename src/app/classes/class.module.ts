import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ClassRoutes } from './class.routing';
import { ClassComponent } from './class.component';
import { AddClassComponent } from './addclass/addclass.component';
import { ViewClassesComponent } from './viewclasses/viewclasses.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(ClassRoutes),MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ ClassComponent,AddClassComponent, ViewClassesComponent]
})

export class ClassModule {}
