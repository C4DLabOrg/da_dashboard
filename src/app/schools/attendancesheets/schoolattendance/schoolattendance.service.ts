import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {BaseUrl} from '../../../baseurl';

@Injectable()
export class SchoolattendanceService {
  progress:any;
  xhr;
  constructor(private http: Http) {

  }

private baseApiUrl = BaseUrl.base_api_url;


//getting Attendance Export File
getExportFile(id,startDate,endDate){
  return this.http.get(this.baseApiUrl+'api/students/exports?school='+id+'&start_date='+startDate+'&end_date='+endDate)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

getStudentDetailsExportFile(id){
  return this.http.get(this.baseApiUrl+'api/students/exportall?school='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

getAllStudentDetailsExportFile(id){
  return this.http.get(this.baseApiUrl+'api/students/exportall?partner='+id)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}



//data importing
sendVerifyAttendanceSheetsData(data: any){

  return Observable.fromPromise(new Promise((resolve, reject) => {
    const studentsImport = this.baseApiUrl+'api/students/import?verify=wait';
    let loadstart;
    let progress;
    let load;
    let token=localStorage.getItem("user");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response) as any);
            } else {
                reject(xhr.response)
            }
        }
    }
    xhr.open("POST", studentsImport, true);
    xhr.setRequestHeader("Authorization", "Bearer "+JSON.parse(token));
    xhr.send(data);
    }))
}

sendattendanceSheetsData(data: any){
  return Observable.fromPromise(new Promise((resolve, reject) => {
    const studentsImport = this.baseApiUrl+'api/students/import?verify=';
    let loadstart;
    let progress;
    let load;
    let token=localStorage.getItem("user");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response) as any);
            } else {
                reject(xhr.response)
            }
        }
    }
    xhr.open("POST", studentsImport, true);
    xhr.setRequestHeader("Authorization", "Bearer "+JSON.parse(token));
    xhr.send(data);
    }))
}

  abortImport(){
    let xhr = new XMLHttpRequest();
    xhr.onabort = function(){}
    xhr.abort();
  }


sendImportAttendanceSchoolData(data: any){
  return Observable.fromPromise(new Promise((resolve, reject) => {
    const studentsImport = this.baseApiUrl+'api/v2/attendances/import';
    let loadstart;
    let progress;
    let load;
    let token=localStorage.getItem("user");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response) as any);
            } else {
                reject(xhr.response)
            }
        }
    }
    xhr.open("POST", studentsImport, true);
    xhr.setRequestHeader("Authorization", "Bearer "+JSON.parse(token));
    xhr.send(data);
    }))
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
