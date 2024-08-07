import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from '../../services/leave.service';


@Component({
  selector: 'app-edit-leaves',
  templateUrl: './edit-leaves.component.html',
  styleUrl: './edit-leaves.component.scss'
})
export class EditLeavesComponent {

  public inputDisabled: boolean = true;
  public editLeaveForm: FormGroup;
  public dateRangeForm: FormGroup;
  public dateRangeValidator: any;
  public currentLeaveData: any = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leaveService: LeaveService,
  ) {
    this.dateRangeForm = this.fb.group({
      fromdate: [this.data.fromdate, [Validators.required]],
      todate: [this.data.todate, [Validators.required]]
    }, { validator: this.dateRangeValidator });

    this.editLeaveForm = this.fb.group({
      empid: [this.data.empid, Validators.compose([Validators.required, Validators.maxLength(6)])],
      type: [this.data.type, Validators.required],
      dateRange: this.dateRangeForm,
      reason: [this.data.reason, Validators.required]
    });

  }

  public onSubmit(): any {
    let updateLeaveRequest: any = {
      id: this.data.id,
      empid: this.data.empid,
      type: this.editLeaveForm.value.type,
      fromdate: this.editLeaveForm.value.dateRange.fromdate,
      todate: this.editLeaveForm.value.dateRange.todate,
      reason: this.editLeaveForm.value.reason,
      status: this.data.status
    }

    this.leaveService.updateLeaveDetails(this.data.id, updateLeaveRequest).subscribe(res => {
      console.log(res);
    })
  }

}
