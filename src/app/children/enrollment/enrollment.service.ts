import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class EnrollmentService {
  private baseApiUrl = BaseUrl.base_api_url;
  constructor( private http: Http){}

//all
  fetchAllChildren(){
    return this.http.get(this.baseApiUrl+'api/students?active=true')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchAllPartnerChildren(id){
    return this.http.get(this.baseApiUrl+'api/students?active=true&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchAllPartnerAdminChildren(id){
    return this.http.get(this.baseApiUrl+'api/students?active=true&partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchAllSchoolChildren(id){
    return this.http.get(this.baseApiUrl+'api/students?active=true&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //enrollments
  fetchChildren(page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnerChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&page='+page+'&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerAdminChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&page='+page+'&partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchSchoolChildren(id,page){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&page='+page+'&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchBoyChildTotal(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=M')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=M&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerAdminBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=M&partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerSearchNameBoyChildTotal(name,id){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner='+id+'&gender=M&is_oosc=true&active=true')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerAdminSearchNameBoyChildTotal(name,id){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner_admin='+id+'&gender=M&is_oosc=true&active=true')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchSchoolBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=M&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchGirlChildTotal(){
      return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=F')
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  fetchPartnerGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=F&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerAdminGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=F&partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerSearchNameGirlChildTotal(name,id){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner='+id+'&gender=F&is_oosc=true&active=true')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchPartnerAdminSearchNameGirlChildTotal(name,id){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner_admin='+id+'&gender=F&is_oosc=true&active=true')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  fetchSchoolGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&gender=F&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by name
  searchData(name){

    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner='+id+'&is_oosc=true&active=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchPartnerAdminData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name+'&partner_admin='+id+'&is_oosc=true&active=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolData(id,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&name='+name+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  //searching by Gender
  searchDataGender(gender){

    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchPartnerDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&gender='+gender+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchPartnerAdminDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&gender='+gender+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolDataGender(id,gender){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&gender='+gender+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by gender and name
  searchPartnerDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students?gender='+gender+'&is_oosc=true&active=true&name='+name+'&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchPartnerAdminDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students?gender='+gender+'&is_oosc=true&active=true&name='+name+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchSchoolDataGenderName(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students?gender='+gender+'&is_oosc=true&active=true&name='+name+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataGenderName(gender,name){
    return this.http.get(this.baseApiUrl+'api/students?enrolls?is_oosc=true&active=true&gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //searching by Partner & Partner Admin
  searchAPartnerData(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchAPartnerAdminData(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by name and partner
  searchDataNamePartner(id,name){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataNamePartnerAdmin(id,name){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner_admin='+id+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by gender and partner
  searchDataGenderPartner(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner='+id+'gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataGenderPartnerAdmin(id,gender){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner_admin='+id+'gender='+gender)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //search by name,gender,partner
  searchDataNameGenderPartner(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner='+id+'gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchDataNameGenderPartnerAdmin(id,gender,name){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&active=true&partner_admin='+id+'gender='+gender+'name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  //getting Attendance Data
  //getting Export File
  getExportFile(id,month,year){
    return this.http.get(this.baseApiUrl+'api/v2/attendances/export?partner='+id+'&month='+month+'&year='+year)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
