import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "./header/header.component";
import { LayoutComponent } from "./layout/layout.component";
import { FooterComponent } from "./footer/footer.component";
import { DialogComponent } from "./dialog/dialog.component";
import { SharedComponent } from "./shared.component";
import { SharedRoutingModule } from "./shared-routing.module";
import { CommonModule } from "@angular/common";
import { DateFormatPipe } from './pipes/date-format.pipe';


@NgModule({
    declarations: [SharedComponent, HeaderComponent, LayoutComponent, FooterComponent, DialogComponent, DateFormatPipe],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        SharedRoutingModule,
        CommonModule
    ],
    exports: [LayoutComponent, HeaderComponent, FooterComponent, CommonModule]
})
export class SharedModule { }