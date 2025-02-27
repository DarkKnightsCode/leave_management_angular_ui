import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../Shared/dialog/dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public login: any = {};
  public credentials: any = {
    username: '',
    password: ''
  };

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public currentuserinfo: any = {
    role: '',
    username: '',
  };

  constructor(private authservice: AuthenticationService, public dialog: MatDialog, private router: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.login = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  public validateLogin(loginCredential: any): any {
    this.credentials.username = loginCredential.username;
    this.credentials.password = loginCredential.password;

    this.authservice.fetchCredentials(loginCredential).subscribe((res: any) => {
      if (res.length != 0 && res[0] != undefined && res[0].role === 'user') {
        this.authservice.currentuserinfo.role = res[0].role;
        this.authservice.currentuserinfo.username = res[0].email;
        this.authservice.currentuserinfo.isactive = "true";
        this.authservice.currentuserinfo.empId = res[0].empid;
        localStorage['logininfo'] = JSON.stringify(this.authservice.currentuserinfo);
        this.openSuccessDialog(res[0]);

      }
      else {
        localStorage['logininfo'] = JSON.stringify({
          username: res[0].email,
          role: 'admin',
          isactive: "true"
        });
        this.openSuccessDialog(res[0]);
      }
    }
    );
  }

  openSuccessDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        title: 'Login Successful',
        message: 'You have successfully logged in!',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (data.role === 'user') {
        this.router.navigate(['/leaves/list-leaves/' + data.empid]);
      }
      else if (data.role === 'admin') {
        this.router.navigate(['/user/list-user']);
      }
    });
  }
}
