import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '@angular/material';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SigninComponent } from './signin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SigninRoutes } from './signin.routing';

@NgModule({
  imports: [MaterialModule, CommonModule, RouterModule.forChild(SigninRoutes), MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  declarations: [SigninComponent, ForgotComponent]
})

export class SigninModule {}
