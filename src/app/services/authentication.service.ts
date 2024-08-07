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
  constructor(private http: HttpClient) {
    const loggedInUser: logindetails = { role: this.currentuserinfo.role }; // Replace with actual user data
    this.userSubject.next(loggedInUser);
  }

  /**
   * To Fetch User Credentials by username and password
   * @param credentials 
   * @returns 
   */
  public fetchCredentials(credentials: any): Observable<usermodel> {
    return this.http.get<usermodel>(`http://localhost:3000/users?email=${credentials.username}&password=${credentials.password}`);
  }

  public isUserLoggedin(): boolean {
    console.log('current' + this.currentuserinfo);

    return this.currentuserinfo.isactive == "true" ? true : false;
  }

  isUserRole(): boolean {
    const user = this.userSubject.value;
    return user?.role === 'user';
  }

  isAdminRole(): boolean {
    const user = this.userSubject.value;
    return user?.role === 'admin';
  }

  hasRole(role: string): boolean {
    const user = this.userSubject.value;
    return user !== null && user.role === role;
  }
}
