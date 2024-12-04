import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AuthGuard } from '../../authguard/auth.guard';
import { PromotedComponent } from './promoted.component';
import { PromotedRoutes } from './promoted.routes';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(PromotedRoutes), MaterialModule, ChartsModule, NgxDatatableModule, FlexLayoutModule],
  declarations: [PromotedComponent],
  providers: [AuthGuard]
})

export class PromotedModule {}
