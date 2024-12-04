import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';



@Injectable()
export class ResetpasswordService {
  constructor(
    private http: Http
  ){}

  //initialize baseApiUrl by calling BaseUrl constant. Make sure you've imported it
  private baseApiUrl = BaseUrl.base_api_url;

  sendData(user: any){

    //assign the url like below
    const _changePasswordRegistrationUrl = this.baseApiUrl+'api/v2/admin/reset-password';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+JSON.parse(token)
    });

    let options = new RequestOptions({headers: headers});

    return this.http.put(_changePasswordRegistrationUrl, body, options)
      .map(this.extractData)
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
