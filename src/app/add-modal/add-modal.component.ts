import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { task } from '../task.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent {

  modalInfo: task;

  constructor(
    public dialogRef: MatDialogRef<AddModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: task
  ) {
    this.modalInfo = { ...data } || { title: '', desc: '', priority: 0, done: false }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

}
