import { User } from '../../shared/interfaces/user.interface';
import { createReducer, on } from '@ngrx/store';
import { addUser } from './actions';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: { email: '', password: '', returnSecureToken: true },
};

export const authReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({
    ...state,
    user: user,
  }))
);
