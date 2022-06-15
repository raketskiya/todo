import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../shared/interfaces/task';
import {TasksService} from '../../../../shared/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() name:string = '';
  @Input() date: Date = new Date();
  @Input() id: string = '';
  @Input() complete?: boolean;
  @Output() completeChange = new EventEmitter<boolean>();
  @Output() completeChangeData = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<string>();

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void { }

  taskRemove(): void {
    this.onRemove.emit(this.id);
  }

  taskChecked(): void {
    this.complete = !this.complete;
    const task: Task = {
      name: this.name,
      date: this.date,
      id: this.id,
      complete: this.complete
    }
    this.tasksService.completeTask(task).subscribe();
    this.completeChange.emit(this.complete)
    this.completeChangeData.emit({complete: this.complete, id: this.id});
  }
}
