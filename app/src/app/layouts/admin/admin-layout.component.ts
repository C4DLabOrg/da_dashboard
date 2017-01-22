import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from "rxjs";
import { SigninService} from '../../signin/signin.service';


import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  providers: [SigninService]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router:Subscription;
  public currentUser;

  today: number = Date.now();
  url: string;
  showSettings:boolean = false;

  @ViewChild('sidemenu') sidemenu;

  constructor(
        public menuItems: MenuItems,
        private router: Router,
        private translate: TranslateService,
        private _signin: SigninService ) {
    let browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    //gets the cuurrently saved user
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.url = event.url;
      if (this.isOver()) this.sidemenu.close();
    });


  }

  ngOnDestroy() {
    this._router.unsubscribe();
    
  }

  isOver(): boolean {
    if(this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }


  logout(){
    this._signin.logout();
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'timelmenuine', name: 'MENU'}
      ]
    });
  }
}
