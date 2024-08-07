import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EditComponent } from './edit/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    EmployeeComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    NgxPaginationModule
  ],
  providers: [provideHttpClient()]
})
export class EmployeeModule { }
