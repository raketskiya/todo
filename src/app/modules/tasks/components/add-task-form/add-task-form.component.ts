import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Task} from '../../../../shared/interfaces/task';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {

  @Output() onAdd = new EventEmitter<Task>()

  tasksForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private tasksService: TasksService ) {

  }

  ngOnInit(): void {

  }

  addTask(){
    const task: Task = {
      name: this.tasksForm.controls['name'].value,
      date: new Date()
    }
    this.onAdd.emit(task);
    this.tasksService.create(task).subscribe((response)=>{
      this.tasksForm.reset();
    });
  }



}
