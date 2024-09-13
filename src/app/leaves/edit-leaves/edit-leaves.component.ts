import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from '../../services/leave.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-leaves',
  templateUrl: './edit-leaves.component.html',
  styleUrl: './edit-leaves.component.scss',
})
export class EditLeavesComponent {

  public inputDisabled: boolean = true;
  public editLeaveForm: FormGroup;
  public dateRangeForm: FormGroup;
  public dateRangeValidator: any;
  public currentLeaveData: any = [];
  public startdate: any;
  public enddate: any;

  constructor
    (
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private leaveService: LeaveService,
      private toast: ToastrService,
      private datePipe: DatePipe
    ) {
    this.dateRangeForm = this.fb.group(
      {
        fromdate: [new Date(this.data.fromdate), [Validators.required]],
        todate: [new Date(this.data.todate), [Validators.required]]
      },
      { validator: this.dateRangeValidator }
    );
    console.log(this.dateRangeForm);
    this.editLeaveForm = this.fb.group(
      {
        empid: [this.data.empid, Validators.compose([Validators.required, Validators.maxLength(6)])],
        type: [this.data.type, Validators.required],
        dateRange: this.dateRangeForm,
        reason: [this.data.reason, Validators.required]
      }
    );
  }

  /**
   * To put the data to database after click on submit button
   * @returns void
   */
  public onSubmit(): void {
    let updateLeaveRequest: any = {
      id: this.data.id,
      empid: this.data.empid,
      type: this.editLeaveForm.value.type,
      fromdate: new Date(this.editLeaveForm.value.dateRange.fromdate),
      todate: new Date(this.editLeaveForm.value.dateRange.todate),
      reason: this.editLeaveForm.value.reason,
      status: this.data.status
    }
    console.log(updateLeaveRequest.fromdate);

    this.leaveService.updateLeaveDetails(this.data.id, updateLeaveRequest).subscribe(res => {
      if (res !== undefined) {
        this.toast.success("Leave updated successfully!");
      }
    });
  }
}
