import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';


@Injectable()
export class EditschoolService {
  constructor(
    private http: Http
  ){}

  public err;
  private baseApiUrl = BaseUrl.base_api_url;

  sendData(user: any){

    //console.log(myApiRoutes=>apiRoutes);
    console.log(user);
    let e_code = localStorage.getItem('editEmisCode');
    const _schoolRegistrationUrl = this.baseApiUrl+'api/schools/'+e_code;
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.patch(_schoolRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

   getSchoolData(id){
    return this.http.get(this.baseApiUrl+'api/schools?id='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getConstituencies(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/zones',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCounties(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/counties',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private handleError(error: Response | any){
    let errMsg: string;

    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message: error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
