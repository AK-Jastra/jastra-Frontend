import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private apiService: ApiService
  ) { }



  /**
   * get admin status created or not
   * @returns
   */
  public getAdminStatus(): Observable<any> {
    return this.apiService.request('get', 'getAdminStatus');
  }
  /**
   * admin registration
   * @returns 
   */
  public registerAdmin(adminDetails: any): Observable<any> {
    return this.apiService.request('post', 'registerAdmin', adminDetails);
  }
  /**
   * admin login with credentails
   * @returns 
   */
  public loginAdmin(adminCredentails: any): Observable<any> {
    return this.apiService.request('post', 'loginAdmin', adminCredentails);
  }
  /**
   * admin forget password
   * @returns 
   */
  public forgotPassword(email: any): Observable<any> {
    return this.apiService.request('post', 'forgotPasswordAdmin', email);
  }
  /**
 * admin reset password link expiry
 * @returns 
 */

  public verifyResetPasswordToken(token: any): Observable<any> {
    return this.apiService.request('get', 'verifyTokenAdmin', null, { token: token })
  }

  /**
   * reset admin password  
   * @returns 
   */
  public resetAdminPassword(adminDetails: any): Observable<any> {
    return this.apiService.request('post', 'resetPasswordAdmin', adminDetails);
  }

  /**
   * get admin profile
   */
  public getAdminProfile(): Observable<any> {
    return this.apiService.request('get', 'getAdminProfile')

  }

  public getSearchResult(search: any): Observable<any> {
    return this.apiService.request('get', 'searchAllData', null, { search });
  }

  public getDetailSearch(search: any): Observable<any> {
    return this.apiService.request('get', 'getDetailSearch', null, { search });
  }

  public getProjectSearchResult(search: any): Observable<any> {
    return this.apiService.request('get', 'getProjectSearchResult', null, { search });

  }


}
