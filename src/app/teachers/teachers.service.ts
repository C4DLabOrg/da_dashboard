import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../baseurl';

@Injectable()
export class TeachersService {

  constructor( private http: Http){}

private baseApiUrl = BaseUrl.base_api_url;

  getTeacherId(id){
    return this.http.get(this.baseApiUrl+'api/teachers/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getClassName(id){
    return this.http.get(this.baseApiUrl+'api/streams/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
