import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsersActions from '../store/users/users.actions';
import { selectAllUsers } from '../store/users/users.selectors';
import { UserFormDialogComponent } from './user-form-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  template: `
  <div style="display:flex;justify-content:space-between;align-items:center;margin:16px 0">
    <h2>Users</h2>
    <button mat-raised-button color="primary" (click)="openDialog()">Add User</button>
  </div>
  <table mat-table [dataSource]="users$ | async" class="mat-elevation-z8" style="width:100%">
    <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef> ID </th><td mat-cell *matCellDef="let u">{{u.id}}</td></ng-container>
    <ng-container matColumnDef="username"><th mat-header-cell *matHeaderCellDef> Username </th><td mat-cell *matCellDef="let u">{{u.username}}</td></ng-container>
    <ng-container matColumnDef="email"><th mat-header-cell *matHeaderCellDef> Email </th><td mat-cell *matCellDef="let u">{{u.email}}</td></ng-container>
    <ng-container matColumnDef="actions"><th style="text-align: center;" mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let u" style="text-align: center;">
      <button style="margin-right:10px" mat-raised-button color="primary" (click)="openDialog(u)">Edit</button>
      <button mat-raised-button color="warn" (click)="onDelete(u.id)">Delete</button>
      </td></ng-container>

    <tr mat-header-row *matHeaderRowDef="cols"></tr>
    <tr mat-row *matRowDef="let row; columns: cols;"></tr>
  </table>
  `,
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatButtonModule, MatDialogModule, MatIconModule, UserFormDialogComponent]
})
export class UsersComponent implements OnInit {
  store = inject(Store);
  dialog = inject(MatDialog);
  users$: Observable<any[]> = this.store.select(selectAllUsers);
  cols = ['id', 'username', 'email', 'actions'];
  ngOnInit() { 
    this.store.dispatch(UsersActions.loadUsers()); 
  }
  openDialog(user?: any) { 
    this.dialog.open(UserFormDialogComponent, { data: user, width: '420px' }); 
  }
  onDelete(id: number) { 
    if (confirm('Delete user?')) this.store.dispatch(UsersActions.deleteUser({ id })); 
  }
}
