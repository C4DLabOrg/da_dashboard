import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';



@Injectable()
export class AddChildrenService {
  constructor(
    private http: Http
  ){}

  //initialize baseApiUrl by calling BaseUrl constant. Make sure you've imported it
  private baseApiUrl = BaseUrl.base_api_url;

  sendData(user: any){

    //assign the url like below
    const _childRegistrationUrl = this.baseApiUrl+'api/students';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(_childRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  editData(user: any){

    //assign the url like below
    const _childRegistrationUrl = this.baseApiUrl+'api/students';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.put(_childRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  fetchPartnerSchools(id){
    return this.http.get(this.baseApiUrl+'api/school?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchSchoolName(id){
    return this.http.get(this.baseApiUrl+'api/school?id='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }




  getClass(id){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/streams?school='+id,options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
