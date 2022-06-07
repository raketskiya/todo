import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../../shared/services/tasks.service';
import {Task} from '../../../../shared/interfaces/task';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Output() onAdd = new EventEmitter<Task>()

  isEmpty: boolean = false;

  tasksForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private tasksService: TasksService ) {

  }

  ngOnInit(): void {

  }

  addTask(){
    this.isEmpty = false;
    console.log(this.isEmpty)
    console.log(this.tasksForm.controls['name'].value)
    if(this.tasksForm.controls['name'].value == null || this.tasksForm.controls['name'].value == ''){
      this.isEmpty = !this.isEmpty;
      return
    }
    const task: Task = {
      name: this.tasksForm.controls['name'].value,
      date: new Date(),
      id: ''
    }
    this.tasksService.create(task).subscribe((response)=>{
      console.log(response)
      this.onAdd.emit({...task, id: response.id});
      this.tasksForm.reset();
    });
  }



}
