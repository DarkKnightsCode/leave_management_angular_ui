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

  /**
   * To Validate the entered date range
   * @param group 
   * @returns boolean if date range is valid
   */
  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const startDate = group.get('fromdate')?.value;
    const endDate = group.get('todate')?.value;
    return startDate && endDate && endDate < startDate ? { validDate: true } : null;
  }

  /**
   * To Navigate to the list leaves component
   * @returns void
   */
  public viewLeaves(): void {
    this.router.navigate(['/leaves/list-leaves/' + this.empid]);
  }

  /**
   * To post the data to database after click on submit button
   * @returns void
   */
  onSubmit(): void {
    let isDateValidated: boolean = true;
    let existingLeaves: number = 0;

    if (this.applyLeaveForm.valid) {
      const formValues = this.applyLeaveForm.value;
      const dateValues = this.dateRangeForm.value;
      const request = {
        empid: formValues.empid,
        type: formValues.type,
        fromdate: new Date(dateValues.fromdate),
        todate: new Date(dateValues.todate),
        reason: formValues.reason,
        status: "pending"
      }
      this.leaveService.getLeavesByEmployeeID(this.empid).subscribe((res: any) => {
        res.forEach((data: any) => {
          if (request.fromdate == data.fromdate || request.fromdate == data.todate) {
            existingLeaves++;
            isDateValidated = false;
          }
        });
        if (existingLeaves > 0) {
          this.toast.error('Leave request is already submitted for following dates');
        }
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

