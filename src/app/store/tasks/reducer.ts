import { Task } from '../../shared/interfaces/task';
import { createReducer, on } from '@ngrx/store';
import { addtask } from './actions';

export interface TasksState {
  activeTasks: Task[];
  complitedTasks: Task[];
}

export const initialState: TasksState = {
  activeTasks: [],
  complitedTasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(addtask, (state, { task }) => ({
    ...state,
    activeTasks: [...state.activeTasks, task],
  }))
);
