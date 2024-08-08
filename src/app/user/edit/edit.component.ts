import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  private empid: string = '';
  private empDetails: any = {};

  public UpdationForm: any = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.empid = data.empidParam;
  }

  ngOnInit(): any {
    this.userService.getEmployeeById(this.empid).subscribe((res: any) => {
      this.empDetails = res[0];
      this.UpdationForm = new FormGroup({
        firstname: new FormControl(res[0]['firstname'],
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ]
        ),
        lastname: new FormControl(res[0]['lastname'], [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl(res[0]['email'], [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ])
      })
    });

  }

  /**
  * To validate the records and submit the data for put request 
  */
  public onSubmit(): any {
    let updateRequest: any = {
      id: this.empDetails.id,
      email: this.UpdationForm.value.email,
      empid: this.empid,
      firstname: this.UpdationForm.value.firstname,
      isActive: this.empDetails.isActive,
      lastname: this.UpdationForm.value.lastname,
      password: this.empDetails.password,
      role: this.empDetails.role
    }
    this.userService.updateEmployeeDetails(this.empDetails.id, updateRequest).subscribe((res: any) => { });
  }

}
