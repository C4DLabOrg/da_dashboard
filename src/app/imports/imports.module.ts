import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


import { AuthGuard } from '../authguard/auth.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ImportsRoutes } from './imports.routing';
import { ImportsComponent } from './imports.component';


@NgModule({
  imports: [CommonModule, FileUploadModule, RouterModule.forChild(ImportsRoutes),ChartsModule,MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [ImportsComponent],
  providers: [AuthGuard]
})

export class ImportsModule {}
