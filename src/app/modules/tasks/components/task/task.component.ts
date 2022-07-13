import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Task } from '../../../../shared/interfaces/task';
import { AppState } from '../../../../store/app-state';
import { editTask } from '../../../../store/tasks/actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject();

  @Input() public description: string = '';

  @Input() public name: string = '';

  @Input() public date: Date = new Date();

  @Input() public id: string = '';

  @Input() public complete: boolean = false;

  @Input() public position: number = 0;

  @Output() public completeData = new EventEmitter<Task>();

  @Output() public onRemove = new EventEmitter<Task>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  public taskRemove(): void {
    const task: Task = {
      name: this.name,
      date: this.date,
      id: this.id,
      complete: this.complete,
      description: this.description,
      position: this.position,
    };

    this.onRemove.emit(task);
  }

  public taskEdit(): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '520px',
      height: '360px',
      data: { name: this.name, description: this.description },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          const task: Task = {
            name: result.name,
            date: new Date(),
            id: this.id,
            complete: this.complete,
            description: result.description,
            position: this.position,
          };
          this.store.dispatch(editTask({ task }));
        }
      });
  }

  public taskChecked(): void {
    const task: Task = {
      name: this.name,
      date: this.date,
      id: this.id,
      complete: this.complete,
      description: this.description,
      position: 0,
    };
    this.completeData.emit(task);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
