import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';
import { EditLeavesComponent } from '../edit-leaves/edit-leaves.component';

@Component({
  selector: 'app-list-leave',
  templateUrl: './list-leave.component.html',
  styleUrl: './list-leave.component.scss'
})
export class ListLeaveComponent implements OnInit {
  private empid: string = '';
  public LeaveList: any = [];
  p: number = 1;
  itemsPerPage: number = 5;
  Math: any;
  public loggedInUserRole: string = '';


  constructor(
    private route: ActivatedRoute,
    private leaveService: LeaveService,
    public dialog: MatDialog
  ) {
    this.empid = this.route.snapshot.params['empid'];
    this.loggedInUserRole = JSON.parse(localStorage['logininfo']).role;
  }

  ngOnInit(): void {
    this.leaveService.getLeavesByEmployeeID(this.empid).subscribe((res: any) => {
      this.LeaveList = res;
    });
  }

  public applyLeaves(): any {
    const dialogref = this.dialog.open(ApplyLeaveComponent, {
      width: '800px',
      height: '550px',
    });
    dialogref.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  public deleteLeave(leaveid: number): any {
    this.leaveService.deleteLeaveByID(leaveid).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    })
  }

  public EditLeaves(leavedata: any): any {
    const dialogref = this.dialog.open(EditLeavesComponent, {
      width: '800px',
      height: '550px',
      data: leavedata,
    });
    dialogref.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.LeaveList.length / this.itemsPerPage);
  }
}
