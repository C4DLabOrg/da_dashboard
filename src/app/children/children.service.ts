import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class ChildrenService {
  private baseApiUrl = BaseUrl.base_api_url;

  constructor( private http: Http){}

  fetchChildren(page){
    return this.http.get(this.baseApiUrl+'api/students?page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchAChild(name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnerChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students?page='+page+'&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  fetchPartnerAdminChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students?page='+page+'&partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchSchoolChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students?page='+page+'&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchData(name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerAdminData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchSchoolData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
