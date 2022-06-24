import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../shared/interfaces/task';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  ngUnsubscribe: Subject<void> = new Subject();

  @Input() description: string = '';
  @Input() name: string = '';
  @Input() date: Date = new Date();
  @Input() id: string = '';
  @Input() complete?: any;
  //@Output() completeChange = new EventEmitter<boolean>();
  @Output() completeData = new EventEmitter<Task>();
  @Output() onRemove = new EventEmitter<Object>();

  constructor() {}

  public taskRemove(): void {
    this.onRemove.emit({ id: this.id, complete: this.complete });
  }

  public taskChecked(): void {
    this.complete = !this.complete;
    const task: Task = {
      name: this.name,
      date: this.date,
      id: this.id,
      complete: this.complete,
      description: this.description,
    };
    //this.completeChange.emit(this.complete);
    this.completeData.emit(task);
  }
}
