import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchComponent } from './search.component';
import { SearchRoutes } from './search.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SearchRoutes), FormsModule, ReactiveFormsModule,MaterialModule,ChartsModule,NgxDatatableModule, FlexLayoutModule],
  declarations: [SearchComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SearchModule {}
