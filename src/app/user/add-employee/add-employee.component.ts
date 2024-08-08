import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  private NextEmpId: string = '';
  public registrationForm: any = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    type: new FormControl('')
  });
  public passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.userService.getLatestRecord().subscribe(
      (record: any) => {
        let currentEmpid = record.empid.substr(2);
        let tempid = parseInt(currentEmpid) + 1;
        let nextEmpId = 'AS' + tempid;
        this.NextEmpId = nextEmpId;
      },
      error => {
        console.error('Error fetching latest record:', error);
      }
    );
  }

  ngOnInit(): void {

    this.registrationForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],
      type: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    },
    );
  }

  onSubmit(): void {

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      let postRequest = {
        empid: this.NextEmpId,
        firstname: this.registrationForm.value.firstName,
        lastname: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.confirmPassword,
        isActive: true,
        role: this.registrationForm.value.type,
        createdDate: new Date()
      }

      this.userService.getEmployeeByEmailId(postRequest.email).subscribe(result => {
        debugger
        if (result.length == 0) {
          this.userService.addNewEmployee(postRequest).subscribe(data => {
            this.toastr.success("New Employee Added Successfully");
          });
        }
        else {
          this.toastr.error("This email address is already rgistered!!!");
          this.registrationForm.markAllAsTouched();
        }
      });

    } else {
      this.registrationForm.markAllAsTouched();
      this.registrationForm.email.markAllAsTouched();
    }
  }

  passwordMatchValidator(group: FormGroup): { mismatch: boolean } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  }
}
