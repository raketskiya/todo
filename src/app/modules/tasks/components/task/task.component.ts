import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  checked: boolean = false;

  @Input() name:string = '';
  @Input() date: Date = new Date();
  @Input() id: string = '';
  @Output() onRemove = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  taskRemove(): void {
    this.onRemove.emit(this.id);
  }
}
