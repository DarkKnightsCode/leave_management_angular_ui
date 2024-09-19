import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { usermodel } from '../../models/usermodel';
import { logindetails } from '../../models/userLoggedInInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<logindetails | null>(null);
  user$ = this.userSubject.asObservable();

  public currentuserinfo: any = {
    empId: '',
    role: '',
    username: '',
    isactive: "false"
  };
  constructor(private http: HttpClient) { }

  /**
   * To Fetch User Credentials by username and password
   * @param credentials 
   * @returns 
   */
  public fetchCredentials(credentials: any): Observable<usermodel> {
    return this.http.post<usermodel>(`https://localhost:7138/user/GetUserByCredentials`, credentials);
  }
}
