import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  usertype: string;
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    usertype: 'all',
    access: 'all',
    accessibilityteacher: 'teacher',
    accessibilitypadmin: 'partner_admin',
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'dashboard'
  },
  {
    usertype: 'none',
    state: 'partners',
    accessibility: 'teacher',
    accessibilityteacher: 'none',
    accessibilitypadmin: 'partner_admin',
    access: 'admin',
    name: 'Partners',
    type: 'sub',
    icon: 'extension',
    children: [
      {state: 'add-partner', name: 'Add Partners'},
      {state: 'view-partners', name: 'View Partners'},
      {state: 'attendance-partners', name: 'Attendance'}
    ]
  },
  {
    usertype: 'admin',
    state: 'counties',
    name: 'Counties',
    type: 'linkb',
    icon: 'map',
  },
  {
    usertype: 'partner',
    state: 'schools',
    accessibility: 'teacher',
    accessibilitypadmin: 'partner_admin',
    access: 'admin',
    name: 'Schools',
    type: 'sub',
    icon: 'home',
    children: [
      {state: 'add-schools', name: 'Add Schools'},
      {state: 'view-schools', name: 'View Schools', access:'partner_admin'},
      {state: 'export-sheets', name: 'Export & Import Attendance Sheets'}
    ]
  },
  {
    usertype: 'teacher',
    state: 'classes',
    name: 'Classes',
    type: 'sub',
    icon: 'store',
    access: 'adminteacher',
    accessibilityteacher: 'teacher',
    //accessibilitypadmin:'partner_admin',
    children: [
      {state: 'add-class', name: 'Add Class'},
      {state: 'view-classes', name: 'View Classes'},
    ]
  },
  {
    usertype: 'teacher',
    state: 'teachers',
    name: 'Teachers',
    type: 'sub',
    icon: 'people',
    access: 'adminteacher',
    accessibilityteacher: 'teacher',
    //accessibilitypadmin:'partner_admin',
    children: [
      {state: 'add-teachers', name: 'Add Teachers'},
      {state: 'view-teachers', name: 'View Teachers'},
    ]
  },
  {
    usertype: 'teacher',
    state: 'promotions',
    paccess: 'teacher',
    name: 'Promote Students',
    type: 'linka',
    icon: 'group_add'
  },
  {
   usertype: 'partner',
    state: 'children',
    name: 'Children',
    access: 'admin',
    accessibilityteacher: 'teacher',
    accessibilitypadmin:'partner_admin',
    type: 'sub',
    icon: 'face',
    children: [
      {state: 'add-children', name: 'Add Children'},
      {state: 'enrollments', name: 'New Enrollments', access:'partner_admin'},
      {state: 'view-children', name: 'View Children', access:'partner_admin'},
      {state: 'dropouts', name: 'Dropouts', access:'partner_admin'},
    ]
  },
  {
    usertype: 'partner',
    accessibility: 'partner',
    state: 'imports',
    name: 'Import',
    type: 'link',
    icon: 'backup'
  },
  {
    usertype: 'all',
    state: 'reports',
    access: 'all',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',

    children: [
      {state: 'change-password', name: 'Change Password'},
      {state: 'reset-password', name: 'Reset Password'},
      {state: 'profile', name: 'Profile'},

    ]
  }/*,{
    usertype: 'all',
    access: 'all',
    state: 'help',
    name: 'Help',
    type: 'link',
    icon: 'local_library'
  }*/
];

@Injectable()
export class MenuItems {
  getadmin(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
