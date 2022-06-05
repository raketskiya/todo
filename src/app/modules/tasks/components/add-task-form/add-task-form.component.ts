import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {

  @Output() onAdd = new EventEmitter<string>()

  tasksForm: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor() {

  }

  ngOnInit(): void {

  }

  addTask(){
    this.onAdd.emit(this.tasksForm.controls['name'].value);
    this.tasksForm.reset();
  }



}
