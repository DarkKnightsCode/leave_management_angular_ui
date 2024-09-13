import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';
import { EditLeavesComponent } from '../edit-leaves/edit-leaves.component';
import { DialogComponent } from '../../Shared/dialog/dialog.component';

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

  /**
   * To Open the apply leave dialog box
   * @returns void
   */
  public applyLeaves(): void {
    const dialogref = this.dialog.open(ApplyLeaveComponent, {
      width: '800px',
      height: '550px',
    });
    dialogref.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  /**
   * To Open the delete leave dialog box for confirmation
   * @returns void
   */
  public deleteLeave(leaveid: number): void {
    const dialogref = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure want to delete this leave?',
        noButton: true,
        actionButtonTitle: 'Yes'
      },
    });
    dialogref.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        this.leaveService.deleteLeaveByID(leaveid).subscribe(() => {
          this.ngOnInit();
        })
      }
    });

  }

  /**
   * To Open the edit leave dialog box
   * @returns void
   */
  public EditLeaves(leavedata: any): void {
    const dialogref = this.dialog.open(EditLeavesComponent, {
      width: '800px',
      height: '550px',
      data: leavedata,
    });
    dialogref.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  /**
   * To get the total pages count
   * @return number
   */
  get totalPages(): number {
    return Math.ceil(this.LeaveList.length / this.itemsPerPage);
  }
}
