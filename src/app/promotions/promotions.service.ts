import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class PromotionsService {

  constructor(
    private http: Http,
  ){}

  private baseApiUrl = BaseUrl.base_api_url;

  promoteStudents(user: any){

    const _teacherRegistrationUrl = this.baseApiUrl+'api/students/bulkmove';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_teacherRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: Response | any){
    let errMsg: string;

    if(error instanceof Response){
      const body = error.json();
      errMsg = body;
    }
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

}
