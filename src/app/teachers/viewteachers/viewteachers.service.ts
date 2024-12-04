import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';

@Injectable()
export class ViewTeachersService {
  constructor( private http: Http){}

private baseApiUrl = BaseUrl.base_api_url;

  fetchTeachers(id,page){
    return this.http.get(this.baseApiUrl+'api/teachers?page='+page+'&school='+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTeacherId(id){
    return this.http.get(this.baseApiUrl+'/api/teachers/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchTeacherData(id,name){

    return this.http.get(this.baseApiUrl+'/api/teachers?name='+name+'&school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
