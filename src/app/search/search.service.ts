import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class SearchService {

  constructor( private http: Http){}

  private baseApiUrl = BaseUrl.base_api_url;

   get_start_date(days){
    var d=new Date()
    return d.setDate(d.getDate() - days);
   }
   get_formatted_date(date){
     return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
   }

  getSchoolStats(link){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/school?school='+link)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSchoolData(id){
    return this.http.get(this.baseApiUrl+'api/schools?id='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getClasssesAttendanceMonitor(id,taken, start_date,end_date){
    let token=JSON.parse(localStorage.getItem("user"));
    //console.log(token);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/attendances/monitor?school='+id+'&taken_attendance='+taken+'&start_date='+start_date+'&end_date='+end_date, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getSevenDaysAttendance(id){

    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?&school='+id+'&start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

 getEnrolledSevenDaysAttendance(id){
   
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    //console.log("The start dat eis ",start_date)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?is_oosc=true&school='+id+'start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getMonthlyAttendance(id){

    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?school='+id+'&start_date='+start_date+'&end_date='+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getChildrenEnrolled(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class/school?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledMonthlyAttendance(id){

    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?is_oosc=true&school='+id+'&start_date='+start_date+'&end_date='+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrollmentGraph(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getEnrolledAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?is_oosc=true&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAnnualEnrollmentGender(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
