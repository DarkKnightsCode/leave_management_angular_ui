import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveDetailsResponse } from '../../models/leavemodel';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  public leaveUrl = 'http://localhost:3000/leavedetails';

  constructor(private http: HttpClient) { }

  public getLeavesByEmployeeID(empId: string): Observable<LeaveDetailsResponse> {
    return this.http.get<LeaveDetailsResponse>(`${this.leaveUrl}?empid=${empId}`);
  }

  public getLeavesByLeaveID(leaveid: number): Observable<LeaveDetailsResponse> {
    return this.http.get<LeaveDetailsResponse>(`${this.leaveUrl}/${leaveid}`);
  }

  public applyLeave(leaveRequest: any): Observable<any> {
    return this.http.post(this.leaveUrl, leaveRequest);
  }

  public deleteLeaveByID(leaveid: number): Observable<any> {
    return this.http.delete(`${this.leaveUrl}/${leaveid}`)
  }

  /**
   * To update the existing leave data.
   * @param id 
   * @param updateRequest
   * @returns Success status code
   */
  public updateLeaveDetails(id: number, updateRequest: any): Observable<any> {

    const url = `${this.leaveUrl}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, updateRequest, { headers });
  }
}
