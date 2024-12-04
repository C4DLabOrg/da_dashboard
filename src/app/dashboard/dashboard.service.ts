import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class DashboardService {

  constructor( private http: Http){}

  private baseApiUrl = BaseUrl.base_api_url;

   getClasssesAttendancePartnerMonitor(page, id,taken, start_date,end_date){
    let token=JSON.parse(localStorage.getItem("user"));
    //console.log(token);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/attendances/monitor?partner='+id+'&page='+page+'&taken_attendance='+taken+'&start_date='+start_date+'&end_date='+end_date, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

   getClasssesAttendancePartnerAdminMonitor(page, id,taken, start_date,end_date){
    let token=JSON.parse(localStorage.getItem("user"));
    //console.log(token);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/attendances/monitor?partner_admin='+id+'&page='+page+'&taken_attendance='+taken+'&start_date='+start_date+'&end_date='+end_date, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getStats(){
    return this.http.get(this.baseApiUrl+'api/statistics')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartner(id){
    return this.http.get(this.baseApiUrl+'api/partners/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerStats(id){
    return this.http.get(this.baseApiUrl+'api/statistics?partner='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminStats(id){
    return this.http.get(this.baseApiUrl+'api/statistics?partner_admin='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWeeklySummary(){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerWeeklySummary(id){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminWeeklySummary(id){
    return this.http.get(this.baseApiUrl+'api/attendance/weekly?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

/*
Annual all children attendance services
--------
*/
  getAnnualAttendanceGender(){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


/*
Annual newly Enrolled attendance services
--------
*/
  getEnrolledAnnualAttendanceGender(){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerAdminAnnualAttendanceGender(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?partner_admin='+id+'&is_oosc=true')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAnnualEnrollmentGender(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAnnualEnrollmentGender(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPartnerAdminAnnualEnrollmentGender(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/gender?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


/*
Monthly all children attendance
-----------
*/
  getMonthlyAttendance(){
    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?start_date='+start_date+'&end_date='+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerMonthlyAttendance(id){
    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?partner='+id+'&start_date='+start_date+'&end_date='+end_date)
    
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminMonthlyAttendance(id){

   var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?partner_admin='+id+'&start_date='+start_date+'&end_date='+end_date)
    

    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


/*
Monthly newly enrolled children attendance
-----------
*/
  getEnrolledMonthlyAttendance(){
    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?is_oosc=true&start_date='+start_date+'&end_date='+end_date)
     .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerMonthlyAttendance(id){

    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?is_oosc=true&partner='+id+'&start_date='+start_date+'&end_date='+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEnrolledPartnerAdminMonthlyAttendance(id){

    var date=new Date()
    var start_date= this.get_formatted_date(new Date(this.get_start_date(190))) 
    var end_date=this.get_formatted_date(new Date())

    return this.http.get(this.baseApiUrl+'api/attendances/monthly?is_oosc=true&partner_admin='+id+'&start_date='+start_date+'&end_date='+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


 /*
Weekly all children attendance
-------------
 */
 get_start_date(days){
  var d=new Date()
  return d.setDate(d.getDate() - days);
 }
 get_formatted_date(date){
   return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
 }
  getSevenDaysAttendance(){
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPartnerSevenDaysAttendance(id){
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner='+id+'&start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPartnerAdminSevenDaysAttendance(id){
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner_admin='+id+'&start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


 /*
Weekly newly enrolled children attendance
-------------
 */
  getEnrolledSevenDaysAttendance(){
   
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    console.log("The start dat eis ",start_date)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?is_oosc=true&start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getEnrolledPartnerSevenDaysAttendance(id){
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    //console.log("The start dat eis ",start_date)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner='+id+'&is_oosc=true&start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getEnrolledPartnerAdminSevenDaysAttendance(id){
    var date=new Date(this.get_start_date(15))
    var d=new Date()
    var start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var end_date=this.get_formatted_date(d)
    console.log("The start dat eis ",start_date)
    return this.http.get(this.baseApiUrl+'api/attendances/daily?partner_admin='+id+'&is_oosc=true&start_date='+start_date+"&end_date="+end_date)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getEnrollmentGraph(){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class')
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerEnrollmentGraph(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPartnerAdminEnrollmentGraph(id){
    return this.http.get(this.baseApiUrl+'api/students/enrolls/class?partner_admin='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
