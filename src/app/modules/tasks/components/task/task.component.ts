import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Task } from '../../../../shared/interfaces/task';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Store } from '@ngrx/store';
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

  @Input() description: string = '';
  @Input() name: string = '';
  @Input() date: Date = new Date();
  @Input() id: string = '';
  @Input() complete: any;
  @Input() position: any;
  @Output() completeData = new EventEmitter<Task>();
  @Output() onRemove = new EventEmitter<Object>();

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
      height: '300px',
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
