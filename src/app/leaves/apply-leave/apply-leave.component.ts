import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss'
})
export class ApplyLeaveComponent {
  applyLeaveForm: FormGroup;
  dateRangeForm: FormGroup;
  private empid: string = '';

  public leaveList: any;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthenticationService,
    private toast: ToastrService,
    private router: Router
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

  ngOnInit(): void {
    this.getAllLeaveDetails();
  }

  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const startDate = group.get('fromdate')?.value;
    const endDate = group.get('todate')?.value;
    return startDate && endDate && endDate < startDate ? { validDate: true } : null;
  }

  public viewLeaves(): void {
    this.router.navigate(['/leaves/list-leaves/' + this.empid]);
  }

  onSubmit(): void {
    if (this.applyLeaveForm.invalid) {
      this.applyLeaveForm.markAllAsTouched();
      return;
    }
    const formValues = this.applyLeaveForm.value;
    const dateValues = this.dateRangeForm.value;
    const request = {
      empid: formValues.empid,
      type: formValues.type,
      fromdate: dateValues.fromdate,
      todate: dateValues.todate,
      reason: formValues.reason,
      status: "submitted"
    }



    this.leaveService.applyLeave(request).subscribe((res: any) => {
      this.toast.success("Leave Submitted Successfully!");
    });
  }

  private getAllLeaveDetails(): any {
    this.leaveService.getLeavesByEmployeeID('AS3464').subscribe((res: any) => {
      this.leaveList = res;
    });
  }
}

