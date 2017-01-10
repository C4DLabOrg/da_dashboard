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
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'Home',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'apps',
    name: 'School',
    type: 'sub',
    icon: 'buiding',
    badge: [
      {type: 'red', value: '3'}
    ],
    children: [
      {state: 'schools', name: 'Schools'},
      {state: 'teachers', name: 'Teachers'},
      {state: 'classes', name: 'Classes'},
      {state: 'students', name: 'Students'}
    ]
  },
  {
    state: 'reports',
    name: 'Reports',
    type: 'link',
    icon: 'book'
  },
  {
    state: 'notifications',
    name: 'Notifications',
    type: 'sub',
    icon: 'bell',
    badge: [
      {type: 'purple', value: '10'}
    ],
  },
  {
    state: 'tables',
    name: 'Tables',
    type: 'sub',
    icon: 'format_line_spacing',
    badge: [
      {type: 'blue-grey', value: '8'
      }
    ],
    children: [
      {state: 'fullscreen', name: 'FULLSCREEN'},
      {state: 'editing', name: 'EDITING'},
      {state: 'filter', name: 'FILTER'},
      {state: 'paging', name: 'PAGING'},
      {state: 'sorting', name: 'SORTING'},
      {state: 'pinning', name: 'PINNING'},
      {state: 'selection', name: 'SELECTION'},
    ]
  },
  {
    state: 'charts',
    name: 'Charts',
    type: 'link',
    icon: 'show_chart',
  },
  {
    state: 'maps',
    name: 'Gis Updates',
    type: 'sub',
    icon: 'navigation',
    badge: [
      {type: 'green', value: 'new'
      }
    ],
    children: [
      {state: 'google', name: 'GOOGLE'},
      {state: 'leaflet', name: 'LEAFLET'}
    ]
  },
  {
    state: 'pages',
    name: 'Pages',
    type: 'sub',
    icon: 'pages',
    children: [
      {state: 'invoice', name: 'INVOICE'},
      {state: 'timeline', name: 'TIMELINE'},
      {state: 'user', name: 'USER'},
      {state: 'blank', name: 'BLANK'},
    ]
  },
  {
    state: 'reports',
    name: 'Reports',
    type: 'sub',
    icon: 'pages',
    children: [
      {state: 'invoice', name: 'INVOICE'},
      {state: 'timeline', name: 'TIMELINE'},
      {state: 'user', name: 'USER'},
      {state: 'blank', name: 'BLANK'},
    ]
  },

  {
    state: 'help',
    name: 'Help',
    type: 'extTabLink',
    icon: 'local_library'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
