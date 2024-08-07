import { Component, ViewChild } from '@angular/core';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrl: './add-leave.component.scss'
})
export class AddLeaveComponent {
  displayedColumns: string[] = ['id', 'type', 'fromdate', 'todate', 'reason', 'status'];
  public leaveList: any;
  //dataSource: leavemodel[] = this.leaveList;

  constructor(private leaveService: LeaveService) {

  }
  ngOnInit(): void {
    this.getAllLeaveDetails();
  }

  private getAllLeaveDetails(): any {
    this.leaveService.getLeavesByEmployeeID('AS3464').subscribe((res: any) => {
      this.leaveList = res;
    });
  }
}



