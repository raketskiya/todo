import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlsModule } from '../../../../shared/controls/controls.module';
import { HttpLoaderFactory } from '../../../../app.module';
import { Task } from '../../../../shared/interfaces/task';
import { appReducers } from '../../../../store/reducers';
import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let task: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
          useDefaultLang: false,
        }),
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ControlsModule,
        BrowserAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const date = new Date().setMilliseconds(0);
    task = {
      name: component.tasksForm.controls['name'].value,
      date: new Date(date),
      id: '',
      complete: false,
      description: '',
      position: 0,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should raise task', () => {
    const event = spyOn(component.onAdd, 'emit');
    component.addTask();
    expect(event).toHaveBeenCalledWith(task);
  });

  it('form should be invalid', () => {
    const control = component.tasksForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should send event on add button click', () => {
    const control = component.tasksForm.get('name');
    control?.setValue('name');
    task.name = control?.value;
    const event = spyOn(component.onAdd, 'emit');
    const button = fixture.debugElement.query(By.css('.btn'));
    event.calls.reset();
    fixture.detectChanges();
    button.nativeElement.click();
    expect(event).toHaveBeenCalledWith(task);
  });

  it('forms fields have to be clear after addition task', () => {
    const nameControl = component.tasksForm.get('name');
    const descriptionControl = component.tasksForm.get('description');
    nameControl?.setValue('name');
    descriptionControl?.setValue('description');
    component.addTask();
    expect(nameControl?.value).toBe(null);
    expect(descriptionControl?.value).toBe(null);
    expect(component.tasksForm.invalid).toBeTruthy();
  });
});
