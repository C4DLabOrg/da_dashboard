import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from "rxjs";
import { SigninService} from '../../signin/signin.service';
import { Search } from './search';
import {AdminLayoutService} from './adminlayout.service';




import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  providers: [SigninService, AdminLayoutService]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router:Subscription;
  public currentUser;
  public search: Search;
  public form: FormGroup;
  public userType;
  public allAccess = 'all';
  welcomeName: string;

  today: number = Date.now();
  url: any;
  showSettings:boolean = false;

  @ViewChild('sidemenu') sidemenu;

  constructor(
        public menuItems: MenuItems,
        private router: Router,
        private translate: TranslateService,
        private _adminLayoutService: AdminLayoutService,
        private _signin: SigninService,
        private fb: FormBuilder ) {
    let browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    //gets the cuurrently saved user
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }


userDashboard:any;
schoolId:any;
  ngOnInit(): void {
    this._router = this.router.events.filter(
      (event:Event) => event instanceof NavigationEnd).subscribe(url => {
      this.url = url;
      if (this.isOver()) this.sidemenu.close();
    });

    this._adminLayoutService.getUserType(this.currentUser).subscribe(data => {
      //console.log(data.info.profile.school);
      localStorage.setItem("user-type", data.type);
      //localStorage.setItem("school", data.info.profile.school);
      this.userType =  data.type;

    });
    this.welcomeName = localStorage.getItem("welcomeName");
    this.userDashboard = localStorage.getItem("user-type");
    //console.log(this.userDashboard, this.welcomeName, 'usertypes');
    this.schoolId = localStorage.getItem("schoolId");

  }

  hideSchools(childitem){
     let hiddenSchools = ['Add Schools','Export Sheets','Add Children', 'Add Partners','Attendance','Add Class', 'Add Teachers', 'View Classes','View Teachers']
     let index=hiddenSchools.indexOf(childitem.name)
     let res=index==-1?true:false
     //console.log("Hide item ",index,res)
     return res
  }

  hideItemsAdmin(childitem){
     let hiddenitemsAdmin = ['Add Schools','Export Sheets','Add Children','Add Class', 'Add Teachers', 'View Classes','View Teachers']
     let index=hiddenitemsAdmin.indexOf(childitem.name)
     let result=index==-1?true:false
     //console.log("Hide item ",index,res)
     return result
  }

  schoolProfile(){
    //console.log('onyesha bana');
      let schoolId = localStorage.getItem("schoolId");
      this.router.navigate(['/school', schoolId],{skipLocationChange: true});

  }
  ngOnDestroy() {
    this._router.unsubscribe();
    this.logout();
  }

  isOver(): boolean {
    if(this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }
  message:string;
  messageChange(){
    this.message = localStorage.getItem("welcomeName");
    //console.log(this.message, 'sdsdsd');
    //console.log('clicked');
  }

  logout(){
    localStorage.clear();
    this._signin.logout();
  }

  profile(){
    this.router.navigate(['/reports/profile']);
  }

}
