import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
export const initialState = { users: [], loading: false, error: null };
export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({ ...state, loading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(UsersActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({ ...state, users: state.users.map((u:any)=> u.id === user.id ? user : u) })),
  on(UsersActions.deleteUserSuccess, (state, { id }) => ({ ...state, users: state.users.filter((u:any)=> u.id !== id) }))
);
