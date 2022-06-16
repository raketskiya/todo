import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Task} from '../../../../shared/interfaces/task';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject();

  @Output() onAdd = new EventEmitter<Task>()

  tasksForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', Validators.maxLength(500))
  })

  constructor(private tasksService: TasksService ) { }

  ngOnInit(): void { }

  addTask(): void {
    const task: Task = {
      name: this.tasksForm.controls['name'].value,
      date: new Date(),
      id: '',
      complete: false,
      description: this.tasksForm.controls['description'].value

    }
    this.tasksService.create(task).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.onAdd.emit({...task, id: response.id});
      this.tasksForm.reset();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
