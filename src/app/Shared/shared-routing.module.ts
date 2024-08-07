import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout/layout.component";


const routes: Routes = [
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'layout', component: LayoutComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule { }