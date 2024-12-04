import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class AttendancepartnersService {
  private baseApiUrl = BaseUrl.base_api_url;

  constructor( private http: Http){}

  fetchPartners(page){
    return this.http.get(this.baseApiUrl+'api/partners?page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchPartnersAdmin(page,id){
    return this.http.get(this.baseApiUrl+'api/partners?partner_admin='+id+'&page='+page)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnersAttendanceMonitor(page, start_date,end_date){
    let token=JSON.parse(localStorage.getItem("user"));
    //console.log(token);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/attendances/partner?page='+page+'&start_date='+start_date+'&end_date='+end_date, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getPartnerAttendanceMonitorPercentage(page, start_date,end_date){
    let token=JSON.parse(localStorage.getItem("user"));
    //console.log(token);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/attendances/monitor/partner?page='+page+'&start_date='+start_date+'&end_date='+end_date, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  //used in enrollment component
  fetchAllPartners(){
    return this.http.get(this.baseApiUrl+'api/partners')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchAPartner(name){
    return this.http.get(this.baseApiUrl+'api/students?name='+name)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchAPartnerAdmin(name,id){
    return this.http.get(this.baseApiUrl+'api/students?partner_admin='+id+'&name='+name)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  searchData(name){

    return this.http.get(this.baseApiUrl+'api/partners?name='+name)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

   searchDataPartnerAdmin(name,id){

    return this.http.get(this.baseApiUrl+'api/partners?name='+name+'&partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  fetchPartnerBoyChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=M&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  

  fetchPartnerGirlChildTotal(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls?is_oosc=true&gender=F&partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
