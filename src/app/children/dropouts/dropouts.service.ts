import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class DropoutsService {
  constructor( private http: Http){}

    private baseApiUrl = BaseUrl.base_api_url;

  fetchDropouts(page){
      return this.http.get(this.baseApiUrl+'api/students/dropouts?page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerDropouts(id,page){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?page='+page+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnerAdminDropouts(id,page){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?page='+page+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchSchoolDropouts(id,page){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?page='+page+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  searchData(school){

    return this.http.get(this.baseApiUrl+'api/students/dropouts?name='+school)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerData(id,school){

    return this.http.get(this.baseApiUrl+'api/students/dropouts?name='+school+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerAdminData(id,school){

    return this.http.get(this.baseApiUrl+'api/students/dropouts?name='+school+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchSchoolData(id,school){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?name='+school+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  searchDataGender(gender){

    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchPartnerAdminDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by gender and name
  searchPartnerDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'&name='+name+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchPartnerAdminDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'&name='+name+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'&name='+name+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataGenderName(gender,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by Partner & Partner Admin
  searchAPartnerData(id){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchAPartnerAdminData(id){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by name and partner
  searchDataNamePartner(id,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataNamePartnerAdmin(id,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner_admin='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by gender and partner
  searchDataGenderPartner(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/drpouts?partner='+id+'gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataGenderPartnerAdmin(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner_admin='+id+'gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by name,gender,partner
  searchDataNameGenderPartner(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner='+id+'gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataNameGenderPartnerAdmin(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/dropouts?partner_admin='+id+'gender='+gender+'name='+name)
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
