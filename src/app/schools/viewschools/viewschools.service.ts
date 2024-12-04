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
  fetchPartnerCountySchools(id,page,countyId){
    return this.http.get(this.baseApiUrl+'api/school?page='+page+'&partner='+id+'&county='+countyId)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnerAdminSchools(id,page){
    return this.http.get(this.baseApiUrl+'api/school?page='+page+'&partner_admin='+id)
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

  searchPartnerAdminData(id,school){

    return this.http.get(this.baseApiUrl+'api/school?school_name='+school+'&partner_admin='+id)
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
