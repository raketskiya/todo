import { TasksState } from './tasks/reducer';
import { AuthState } from './auth/reducer';

export interface AppState {
  tasks: TasksState;
  auth: AuthState;
}
