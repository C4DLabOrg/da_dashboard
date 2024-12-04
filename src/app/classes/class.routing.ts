import { Routes } from "@angular/router";

import { ClassComponent } from './class.component';
import { AddClassComponent } from './addclass/addclass.component';
import { ViewClassesComponent } from './viewclasses/viewclasses.component';


export const ClassRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'view-classes',
      component: ViewClassesComponent
    },{
      path: 'add-class',
      component: AddClassComponent
    }, {
      path: 'class/:id',
      component: ClassComponent
    }
  ],
  }
]
