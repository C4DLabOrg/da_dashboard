import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AuthGuard } from '../authguard/auth.guard';
import { PromotionsComponent } from './promotions.component';
import { PromotionsRoutes } from './promotions.routing';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(PromotionsRoutes), MaterialModule, ChartsModule, NgxDatatableModule, FlexLayoutModule],
  declarations: [PromotionsComponent],
  providers: [AuthGuard]
})

export class PromotionsModule {}
