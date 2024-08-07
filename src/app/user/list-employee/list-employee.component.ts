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
  p: number = 1;
  itemsPerPage: number = 5;
  Math: any;
  public usersList: any = [];
  public displayedColumns: string[] = ['empid', 'firstname', 'email', 'status'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getEmployeeList().subscribe((res: any) => {
      this.usersList = res;
    });
  }
  dataSource = new MatTableDataSource<any>(this.usersList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ViewLeaves(empid: string): any {
    this.router.navigate(['/leaves/list-leaves/' + empid]);
    //this.router.navigate(['/leaves/add-leave']);
  }

  public addEmployee(): any {
    const dialogref = this.dialog.open(AddEmployeeComponent, {
      width: '900px',
    });
    dialogref.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  public openEditEmployeeDialog(empid: string): any {
    const dialogref = this.dialog.open(EditComponent, {
      width: '800px',
      height: '300px',
      data: {
        empidParam: empid,
      }
    });
    dialogref.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.usersList.length / this.itemsPerPage);
  }
}
