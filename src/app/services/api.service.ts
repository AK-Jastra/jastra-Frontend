import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


/*
    interface for token
 */
interface TokenResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiURL: string = environment.apiEndPoint;

  private token: any;

  constructor(
    private http: HttpClient,
    private router: Router) { }


  /*
      save token into localStorage as a item with specific key
   */
  private saveToken(token: string): void {
    localStorage.setItem('sdasd923hd9dwe', token);
    this.token = token;
  }

  /*
      call for fetch token from localStrogae
   */
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('sdasd923hd9dwe');
    }
    return this.token;
  }

  /*
      fetch user token details
   */
  public getUserDetails(): any {
    const token = this.getToken();
    let payload: any;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /*
      call for check the user session
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  /*
      all type of api call handlers at client side and send token in header in all GET api call to verify valid user
      application at back end match user token with this token, if both token are match means this is a valid user otherwise
      return with a exception invalid user
   */
  public request(method: 'post' | 'get', type: any, user?: any, paramslist?: any): Observable<any> {
    let base;

    if (method === 'post') {
      if (type === 'registration' || type === 'login' || type === 'securityauth') {
        base = this.http.post<any>(`${this.apiURL}/` + type, user, {
          withCredentials: true
        });
      } else {
        base = this.http.post<any>(`${this.apiURL}/` + type, user, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${this.getToken()}` }
        });
      }
    } else {
      base = this.http.get<any>(`${this.apiURL}/` + type, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
        withCredentials: true,
        params: paramslist
      });
    }
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data !== null && data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  // headers: {'env':this.cookieService.get('env')}
  public externalrequest(method: 'post' | 'get', type: any, user?: any, paramslist?: any): Observable<any> {
    if (method === 'get') {
      return this.http.get<any>(`${this.apiURL}/` + type, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
        withCredentials: true, params: paramslist
      });
    } else {
      return this.http.post<any>(`${this.apiURL}/` + type, user, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
        withCredentials: true, params: paramslist
      });
    }
  }

  // 'env':this.cookieService.get('env')
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('sdasd923hd9dwe');
    this.router.navigateByUrl('');
  }
}
