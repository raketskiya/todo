import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject();

  @Input() description: string = '';
  @Input() name:string = '';
  @Input() date: Date = new Date();
  @Input() id: string = '';
  @Input() complete?: boolean;
  @Output() completeChange = new EventEmitter<boolean>();
  @Output() completeData = new EventEmitter<Task>();
  @Output() onRemove = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void { }

  taskRemove(): void {
    this.onRemove.emit({id: this.id, complete: this.complete});
  }

  taskChecked(): void {
    this.complete = !this.complete;
    const task: Task = {
      name: this.name,
      date: this.date,
      id: this.id,
      complete: this.complete,
      description: this.description
    }
    this.completeChange.emit(this.complete)
    this.completeData.emit(task);
  }

}
