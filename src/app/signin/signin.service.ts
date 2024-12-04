import {Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

import { User } from './user';
import * as moment from 'moment';

@Injectable()
export class SigninService {

  //public handleError;
  public err;
  private baseApiUrl = BaseUrl.base_api_url;

  constructor(
    private _router: Router,
    private activatedRouter:ActivatedRoute,
    private http: Http){}


  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("schoolId");
    localStorage.clear();
    this._router.navigate(['signin']);
  }


  nav:any;
  schoolId:any;

  isTokenExpired(){
    //get the value of the stored signin time
    let ExpiryTime = JSON.parse(localStorage.getItem("tokenExpiryTime"));

    //get refresh token
    let refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
    
    //get the current time
    let now = moment().valueOf();

    // addd expiry time to an additional 50 minutes and transform it into milliseconds
    let afternow = moment(ExpiryTime).add(50, 'm').toDate();
    let nowAfter = moment(afternow).valueOf();

    //if the user had chcecked the remember Me 
    let rememberMe = localStorage.getItem("rememberMe");

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let options = new RequestOptions({headers: headers});

    
      // // console.log(rememberMe, 'time logged in', ExpiryTime, 'time should expire', nowAfter, 'current time', now);
     
     //url to redirect to dashboard if it's activated
     let returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'] || '/home';


     //console.log(now , 'then', nowAfter, 'then', rememberMe);


    //if the current time is greater than the stored expiry then refresh the token
    if(now > nowAfter && rememberMe =='true'){

      //console.log('1');

      return this.http.post(this.baseApiUrl + "o/token/",
      "refresh_token="+refresh_token+"&grant_type=refresh_token&client_id=dnFhSdWfy2XjFqTzpSLMbYqRKOgGei2eG7hUnNDS",
      { headers: headers }).map(data =>{

        let tokenExpiryTime = data.json().expires_in;
        localStorage.setItem("tokenExpiryTime",tokenExpiryTime)
        
          let gettoken = JSON.parse(localStorage.getItem('user'));
          this.getUserType(gettoken).subscribe(data => {

            localStorage.setItem("user-type", data.type);
            this.nav =  data.type;
            //this.load = false;
              if(this.nav == "teacher"){
                let schoolId = data.info.profile.school;
                localStorage.setItem("schoolId", schoolId);
                //console.log(schoolId);
                localStorage.setItem("welcomeName", data.info.profile.name);
                this.schoolId = localStorage.getItem("schoolId");
                this._router.navigate(['/school', schoolId]);
              }else if(this.nav == "partner"){
                let partnerId = data.info.id;
                let partnerName = data.info.name;
                //console.log(partnerId);
                localStorage.setItem("partnerId", partnerId);
                localStorage.setItem("welcomeName", partnerName);
                this._router.navigate([returnUrl]);
              }else if(this.nav == "partner_admin"){
                //an admin controlling a specific region
                let partneradminId = data.info.id;
                let partnerName = data.info.name;
                //console.log(partnerId);
                localStorage.setItem("partneradminId", partneradminId);
                localStorage.setItem("welcomeName", partnerName);
                this._router.navigate([returnUrl]);
              }else{
                //console.log('admin');
                this._router.navigate([returnUrl]);
              }
          });
      })
      .catch(this.handleError);
    }
    //if the current time is less than the expiry time then redirect to dashboard
    else if(now < nowAfter && rememberMe =='true'){

      // console.log('2');
      //this._router.navigate([returnUrl]);
      let gettoken = JSON.parse(localStorage.getItem('user'));
          this.getUserType(gettoken).subscribe(data => {

            localStorage.setItem("user-type", data.type);
            this.nav =  data.type;
            //this.load = false;
              if(this.nav == "teacher"){
                let schoolId = data.info.profile.school;
                localStorage.setItem("schoolId", schoolId);
                //console.log(schoolId);
                localStorage.setItem("welcomeName", data.info.profile.name);
                this.schoolId = localStorage.getItem("schoolId");
                this._router.navigate(['/school', schoolId]);
              }else if(this.nav == "partner"){
                let partnerId = data.info.id;
                let partnerName = data.info.name;
                //console.log(partnerId);
                localStorage.setItem("partnerId", partnerId);
                localStorage.setItem("welcomeName", partnerName);
                this._router.navigate([returnUrl]);
              }else if(this.nav == "partner_admin"){
                //an admin controlling a specific region
                let partneradminId = data.info.id;
                let partnerName = data.info.name;
                //console.log(partnerId);
                localStorage.setItem("partneradminId", partneradminId);
                localStorage.setItem("welcomeName", partnerName);
                this._router.navigate([returnUrl]);
              }else{
                //console.log('admin');
                this._router.navigate([returnUrl]);
              }
          });
    }
    //if the local storage is cleared then redirect to signin page
    else{
       //console.log('3');
      this.logout()
    }
  }

  login(user: any){

    const _signinUrl = this.baseApiUrl+'o/token/';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
  //  const headers = new Headers();

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_signinUrl, user, options)
      .map((data: Response) => {
        //login successful if there's a jwt token in response
        this.extractData  = data.json().access_token;
        let user = data.json();

        if(user && user.access_token){
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user.access_token));
          //get how long the token will expire

          let tokenExpiryTime = user.expires_in;

          //get the current time of signing in and store it in localstorage
          let now = moment().valueOf();
          localStorage.setItem("tokenExpiryTime",JSON.stringify(now))
          //store refresh token
          localStorage.setItem("refresh_token", JSON.stringify(user.refresh_token));

        }else{
          localStorage.removeItem("user");
          //this._router.navigate(['signin']);
        }
      })
      .catch(this.handleError);
  }


   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['signin']);
    }
  }

  getUserType(user){
      //assign the url like below
      const _userTypeUrl = this.baseApiUrl+'api/user-type';
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+user
      });

      let options = new RequestOptions({headers: headers});

      return this.http.get(_userTypeUrl, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }


  private handleError(error: Response | any){
    let errMsg: string;

    if(error instanceof Response){
      const body = error.json();
      errMsg = body;
    }
    return Observable.throw(errMsg);
  }
}
