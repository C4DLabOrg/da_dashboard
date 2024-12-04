import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NotFoundRoutes } from './not-found.routing';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(NotFoundRoutes),ChartsModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NgxDatatableModule],
  declarations: [NotFoundComponent]
})

export class NotFoundModule {}
