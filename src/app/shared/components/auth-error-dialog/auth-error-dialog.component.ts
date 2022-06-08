import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-auth-error-dialog',
  templateUrl: './auth-error-dialog.component.html',
  styleUrls: ['./auth-error-dialog.component.scss']
})
export class AuthErrorDialogComponent implements OnInit {

  errorMassage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AuthErrorDialogComponent>) {
    this.errorMassage = data;
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
