import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AuthGuard } from './authguard/auth.guard';
import { Adminaccess } from './authguard/adminaccess';
import { Schoolaccess } from './authguard/schoolaccess';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  }, {
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  }, {
    path: 'classes',
    loadChildren: './classes/class.module#ClassModule',
    canActivate: [AuthGuard, Schoolaccess]
  },{
    path: 'partners',
    loadChildren: './partners/partners.module#PartnersModule',
    canActivate: [AuthGuard, Adminaccess],
  },{
    path: 'counties',
    loadChildren: './counties/county.module#CountyModule',
    canActivate: [AuthGuard, Adminaccess]
  },
  {
    path: 'promotions',
    loadChildren: './promotions/promotions.module#PromotionsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'promoted',
    loadChildren: './promotions/promoted/promoted.module#PromotedModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'children',
    loadChildren: './children/children.module#ChildrenModule',
    canActivate: [AuthGuard]
  }, {
    path: 'schools',
    loadChildren: './schools/schools.module#SchoolsModule',
    canActivate: [AuthGuard]
  }, {
    path: 'teachers',
    loadChildren: './teachers/teachers.module#TeachersModule',
    canActivate: [AuthGuard, Schoolaccess]
  }, {
    path: 'imports',
    loadChildren: './imports/imports.module#ImportsModule',
    canActivate: [AuthGuard]
  },{
    path: 'reports',
    loadChildren: './reports/reports.module#ReportsModule',
    canActivate: [AuthGuard]
  }, {
    path: 'system-logs',
    loadChildren: './chartlib/chartlib.module#ChartlibModule',
    canActivate: [AuthGuard]
  }, {
    path: 'activity-logs',
    loadChildren: './maps/maps.module#MapModule',
    canActivate: [AuthGuard]
  }, {
    path: 'help',
    loadChildren: './dragndrop/dragndrop.module#DragndropModule',
    canActivate: [AuthGuard]
  }, {
    path: 'school/:id',
    loadChildren: './search/search.module#SearchModule',
    canActivate: [AuthGuard]
  },{
    path: '404',
    loadChildren: './not-found/not-found.module#NotFoundModule',
    canActivate: [AuthGuard]
  }

]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'signin',
    loadChildren: './signin/signin.module#SigninModule'
  //  ./signin/signin.module#SigninModule
  }]
}, {
  path: '**',
  redirectTo: '404'
}];
