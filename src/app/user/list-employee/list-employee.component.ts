import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent implements OnInit, AfterViewInit {
  newPage: number = 1;
  itemsPerPage: number = 5;
  Math: any;
  public usersList: usermodeltable[] = [];
  public displayedColumns: string[] = ['empid', 'firstname', 'email', 'status'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listEmployees();
  }

  public listEmployees(): any {
    this.usersList = [];
    this.userService.getEmployeeList().subscribe((res: any) => {
      res.forEach((element: any) => {
        let data = {
          "empid": element.employeeId,
          "firstname": element.firstName,
          "lastname": element.lastName,
          "email": element.email,
        }
        this.usersList.push(data);
      });
    });
  }

  dataSource = new MatTableDataSource<any>(this.usersList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * To navigate to list leaves page
   * @param empid 
   * @returns void
   */
  public ViewLeaves(empid: string): void {
    this.router.navigate(['/leaves/list-leaves/' + empid]);
  }

  /**
   * To open the dialog box for adding new employee 
   */
  public addEmployee(): void {
    const dialogref = this.dialog.open(AddEmployeeComponent, {
      width: '900px',
    });
    dialogref.afterClosed().subscribe((res) => {
      this.listEmployees();
    });
  }

  /**
   * To open the dialog box for edit employee details
   */
  public openEditEmployeeDialog(empid: string): any {
    const dialogref = this.dialog.open(EditComponent, {
      width: '800px',
      height: '300px',
      data: {
        empidParam: empid,
      }
    });
    dialogref.afterClosed().subscribe((res) => {
      this.listEmployees();
    });
  }

  /**
   * To get the total pages count
   * @return number
   */
  get totalPages(): number {
    return Math.ceil(this.usersList.length / this.itemsPerPage);
  }
}


export interface usermodeltable {
  "empid": string;
  "firstname": string;
  "lastname": string;
  "email": string;
}