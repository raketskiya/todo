import { Task } from '../../shared/interfaces/task';
import { createReducer, on } from '@ngrx/store';
import { addtask } from './actions';

export interface TasksState {
  activeTasks: Task[];
  complitedTasks: Task[];
  counter: number;
}

export const initialState: TasksState = {
  activeTasks: [],
  complitedTasks: [],
  counter: 0,
};

export const tasksReducer = createReducer(
  initialState,
  on(addtask, (state, { task }) => ({
    ...state,
    counter: state.counter + 1,
  }))
);
