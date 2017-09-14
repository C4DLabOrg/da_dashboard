import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class ViewSchoolsService {
  constructor( private http: Http){}

    private baseApiUrl = BaseUrl.base_api_url;

  fetchSchools(page){
      return this.http.get(this.baseApiUrl+'api/school?page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerSchools(id,page){
    return this.http.get(this.baseApiUrl+'api/school?page='+page+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchData(school){

    return this.http.get(this.baseApiUrl+'api/school?school_name='+school)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerData(id,school){

    return this.http.get(this.baseApiUrl+'api/school?school_name='+school+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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
