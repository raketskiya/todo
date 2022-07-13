import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../../../../shared/interfaces/task';
import { AppState } from '../../../../store/app-state';
import { selectActiveTasks } from '../../../../store/tasks/selectors';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<void> = new Subject();

  private activeTasks$ = this.store.select(selectActiveTasks);

  public activeTasks: Task[] = [];

  @Output() public onAdd: EventEmitter<Task> = new EventEmitter<Task>();

  public tasksForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', Validators.maxLength(100)),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.activeTasks$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((activeTasks) => {
        this.activeTasks = [...activeTasks];
      });
  }

  public addTask(): void {
    const date = new Date().setMilliseconds(0);
    const { length } = this.activeTasks;
    const task: Task = {
      name: this.tasksForm.controls['name'].value,
      date: new Date(date),
      id: '',
      complete: false,
      description: this.tasksForm.controls['description'].value,
      position: length,
    };
    this.onAdd.emit(task);
    this.tasksForm.reset();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
