import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as UsersActions from '../store/users/users.actions';

@Component({
  selector: 'app-user-form-dialog',
  template: `
<h2 mat-dialog-title style="padding-left: 16px;">
  {{ data ? 'Edit User' : 'Add User' }}
</h2>
  <mat-dialog-content>
    <form [formGroup]="form">
      <mat-form-field style="width:100%"><input matInput placeholder="Username" formControlName="username" /></mat-form-field>
      <mat-form-field style="width:100%"><input matInput placeholder="Email" formControlName="email" /></mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef.close()">Cancel</button>
    <button mat-raised-button color="primary" (click)="save()">Save</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogContent, MatDialogActions]
})
export class UserFormDialogComponent {
  fb = inject(FormBuilder);
  store = inject(Store);
  dialogRef = inject(MatDialogRef);
  form = this.fb.group({ id: [null], username: ['', Validators.required], email: ['', [Validators.required, Validators.email]] });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) this.form.patchValue(data);
  }
  save() {
    if (this.form.invalid) return;
    const val = this.form.value;
    if (val.id) {
      this.store.dispatch(UsersActions.updateUser({ user: val }))
    } else {
      this.store.dispatch(UsersActions.addUser({ user: val }))
    };
    this.dialogRef.close();
  }
}
