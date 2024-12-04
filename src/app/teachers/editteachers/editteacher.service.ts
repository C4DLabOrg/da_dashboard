import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';



@Injectable()
export class EditteacherService {
  constructor(
    private http: Http,
    private datePipe: DatePipe
  ){}

  private baseApiUrl = BaseUrl.base_api_url;

  transformDate(date){
    this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  sendData(user: any){

    //console.log(this.api.api_url);

    const _teacherRegistrationUrl = this.baseApiUrl+'api/teacher';
    const body = JSON.stringify(user);

     //this is optional - angular2 already sends these
     //const headers = new Headers();
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });

    let options = new RequestOptions({headers: headers});

    return this.http.put(_teacherRegistrationUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getSchools(id){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/schools?partner='+id,options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSchoolName(id){
    return this.http.get(this.baseApiUrl+'api/schools?id='+id)
    .map((response:Response) => response.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

    getTeacher(id){
    return this.http.get(this.baseApiUrl+'/api/teachers/'+id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
