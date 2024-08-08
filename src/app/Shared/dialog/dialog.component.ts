import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  public noButton: boolean = false;
  public actionButtonTitle: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.noButton = data.noButton;
    if (data.actionButtonTitle == undefined) {
      this.actionButtonTitle = "close";
    } else {
      this.actionButtonTitle = data.actionButtonTitle;
    }
  }

  /**
   * To close the dialog box on "No" button
   * @returns returns noting
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

}
