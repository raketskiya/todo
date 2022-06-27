import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/interfaces/user.interface';

export const addUser = createAction('[Auth] Add User', props<{ user: User }>());
