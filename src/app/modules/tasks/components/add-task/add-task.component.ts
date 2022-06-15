import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Task} from '../../../../shared/interfaces/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Output() onAdd = new EventEmitter<Task>()

  tasksForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private tasksService: TasksService ) { }

  ngOnInit(): void { }

  addTask(): void {
    const task: Task = {
      name: this.tasksForm.controls['name'].value,
      date: new Date(),
      id: '',
      complete: false

    }
    this.tasksService.create(task).subscribe((response) => {
      this.onAdd.emit({...task, id: response.id});
      this.tasksForm.reset();
    });
  }
}
