import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initForm();
  }
  //Close the dialog when clicking on cancel
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Creating a FormGroup for managing multiple inputs
  private initForm(): void {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.data.firstName, [Validators.required]),
      lastName: new FormControl(this.data.lastName, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required]),
      id: new FormControl(this.data.id, [Validators.required]),
    });
  }

  //Updating all the input data values when closing the dialog
  update() {
    console.log(this.editForm.value);
    this.dialogRef.close(this.editForm.value);
  }
}
