import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
    { path: 'add-user', component: AddEmployeeComponent },
    { path: 'list-user', component: ListEmployeeComponent },
    { path: 'edit-user/:empid', component: EditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployeeRoutingModule { }