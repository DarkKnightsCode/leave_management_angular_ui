import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss'
})
export class ApplyLeaveComponent {
  applyLeaveForm: FormGroup;
  dateRangeForm: FormGroup;
  private empid: string = '';
  private todaysdate = new Date().toISOString();

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthenticationService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {

    this.empid = this.authService.currentuserinfo.empId;
    this.dateRangeForm = this.fb.group({
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]]
    }, { validator: this.dateRangeValidator });

    this.applyLeaveForm = this.fb.group({
      empid: [this.authService.currentuserinfo.empId, Validators.compose([Validators.required, Validators.maxLength(6)])],
      type: ['', Validators.required],
      dateRange: this.dateRangeForm,
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const startDate = group.get('fromdate')?.value;
    const endDate = group.get('todate')?.value;
    return startDate && endDate && endDate < startDate ? { validDate: true } : null;
  }

  public viewLeaves(): void {
    this.router.navigate(['/leaves/list-leaves/' + this.empid]);
  }

  onSubmit(): void {
    let isDateValidated: boolean = true;
    if (this.applyLeaveForm.valid) {
      const formValues = this.applyLeaveForm.value;
      const dateValues = this.dateRangeForm.value;
      const request = {
        empid: formValues.empid,
        type: formValues.type,
        fromdate: new Date(dateValues.fromdate).toISOString(),
        todate: new Date(dateValues.todate).toISOString(),
        reason: formValues.reason,
        status: "submitted"
      }
      this.leaveService.getLeavesByEmployeeID(this.empid).subscribe((res: any) => {
        res.forEach((data: any) => {
          if (request.fromdate < data.todate || request.fromdate == data.fromdate || request.fromdate == data.todate) {
            this.toast.error('Leave request is already submitted for following dates');
            isDateValidated = false;
          }
        });
        if (isDateValidated) {
          this.leaveService.applyLeave(request).subscribe((res: any) => {
            this.router.navigate(['/leaves/list-leaves/' + this.empid]);
            this.dialog.closeAll();
            this.toast.success("Leave Submitted Successfully!");
          });
        }
      });
    }
    else {
      this.applyLeaveForm.markAllAsTouched();
      return;
    }
  }
}

