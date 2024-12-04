import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ForgotpasswordService} from './forgotpassword.service';
//import { Partner } from './partner';



@Component({
  selector: 'app-partner',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  providers: [ForgotpasswordService]

})
export class ForgotpasswordComponent implements OnInit {
  ngOnInit(){}
}
