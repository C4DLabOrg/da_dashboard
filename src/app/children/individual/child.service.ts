
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class ChildService {

  constructor( private http: Http){}

  private baseApiUrl = BaseUrl.base_api_url;

  fetchChild(id){
    return this.http.get(this.baseApiUrl+'api/students/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchChildAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/yearly?student='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchWeeklyAttendance(id){
    return this.http.get(this.baseApiUrl+'api/attendances/weekly?student='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
