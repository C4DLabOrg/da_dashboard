import { Routes } from "@angular/router";

import { ChildrenComponent } from './children.component';
import { AddChildrenComponent } from './addchildren/addchildren.component';


export const ChildrenRoutes: Routes = [{
  path: '',
  children: [{
    path: 'view-children',
    component: ChildrenComponent
  },{
    path: 'add-children',
    component: AddChildrenComponent
  }
],
}];
