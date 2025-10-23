import { createFeatureSelector, createSelector } from '@ngrx/store';
export const selectUsersState = createFeatureSelector<any>('users');
export const selectAllUsers = createSelector(selectUsersState, s => s.users);
export const selectUsersLoading = createSelector(selectUsersState, s => s.loading);
