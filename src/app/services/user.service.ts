import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public userURL = 'http://localhost:3000/users';
  /**
   * To Get the all employee details in list.
   * @returns list of employees
   */
  public getEmployeeList(): Observable<any> {
    return this.http.get<any[]>(this.userURL);
  }

  /**
   * To Get employee details by their employee ID
   * @param id 
   * @returns Employee Details
   */
  public getEmployeeById(empid: string): Observable<any> {
    return this.http.get(`${this.userURL}?empid=${empid}`);
  }

  /**
   * To Get employee details by their employee Email-ID
   * @param email 
   * @returns Employee Details
   */
  public getEmployeeByEmailId(email: string): Observable<any> {
    return this.http.get(`${this.userURL}?email=${email}`);
  }

  /**
   * To update the existing user data.
   * @param id 
   * @param updateRequest
   * @returns Success status code
   */
  public updateEmployeeDetails(id: number, updateRequest: any): Observable<any> {

    const url = `${this.userURL}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, updateRequest, { headers });
  }

  /**
   * To add new employee to database
   * @param postRequest 
   * @returns Added User Data
   */
  public addNewEmployee(postRequest: any): Observable<any> {
    return this.http.post(this.userURL, postRequest);
  }


  /**
   * To fetch the latest record
   * @returns lastest leave record 
   */
  getLatestRecord(): Observable<any> {
    return this.getEmployeeList().pipe(
      map(records => {
        if (!records || records.length === 0) {
          return null;
        }
        // Find the latest record by ID
        const latestRecord = records.reduce((latest: { id: number; }, record: { id: number; }) =>
          record.id > latest.id ? record : latest
        );

        return latestRecord;
      })
    );
  }
}
