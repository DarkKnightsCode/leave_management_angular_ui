import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLeaveComponent } from './list-leave/list-leave.component';
import { LeaveComponent } from './leave.component';
import { LeavesRoutingModule } from './leaves-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { EditLeavesComponent } from './edit-leaves/edit-leaves.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { NumberToArrayPipe } from '../Shared/pipes/number-to-array.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    LeaveComponent,
    ListLeaveComponent,
    ApplyLeaveComponent,
    EditLeavesComponent,
    NumberToArrayPipe
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    TableModule,
    NgxPaginationModule,
    MatTooltipModule
  ],
  providers: []
})
export class LeavesModule { }
