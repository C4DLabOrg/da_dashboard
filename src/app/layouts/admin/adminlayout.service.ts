import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { BaseUrl} from '../../baseurl';



@Injectable()
export class AdminLayoutService {
  constructor(
    private http: Http
  ){}


  private baseApiUrl = BaseUrl.base_api_url;


  sendSearch(user: any){
    const _searchUrl = this.baseApiUrl+'api/schools/'+user.search;

    return this.http.get(_searchUrl)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')
      );
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getSearchResults(){
    let token=localStorage.getItem("user");
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl+'api/schools',options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserType(user){
      //assign the url like below
      const _userTypeUrl = this.baseApiUrl+'api/user-type';
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+user
      });

      let options = new RequestOptions({headers: headers});

      return this.http.get(_userTypeUrl, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
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
