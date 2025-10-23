import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  base = 'http://localhost:3000/users';
  constructor(private actions$: Actions, private http: HttpClient) {}

  load$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    mergeMap(() => this.http.get<any[]>(this.base).pipe(
      map(users => UsersActions.loadUsersSuccess({ users })),
      catchError(err => of(UsersActions.loadUsersFailure({ error: err.message || 'Load failed' })))
    ))
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.addUser),
    mergeMap(({ user }) => this.http.post<any>(this.base, user).pipe(
      map(created => UsersActions.addUserSuccess({ user: created })),
      catchError(err => of(UsersActions.addUserFailure({ error: err.message || 'Add failed' })))
    ))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.updateUser),
    mergeMap(({ user }) => this.http.put<any>(`${this.base}/${user.id}`, user).pipe(
      map(updated => UsersActions.updateUserSuccess({ user: updated })),
      catchError(err => of(UsersActions.updateUserFailure({ error: err.message || 'Update failed' })))
    ))
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.deleteUser),
    mergeMap(({ id }) => this.http.delete<any>(`${this.base}/${id}`).pipe(
      map(() => UsersActions.deleteUserSuccess({ id })),
      catchError(err => of(UsersActions.deleteUserFailure({ error: err.message || 'Delete failed' })))
    ))
  ));
}
