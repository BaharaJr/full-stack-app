import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/services/base.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-view-taks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
})
export class ViewTasksComponent implements OnInit {
  tasks: any;
  datas: any;
  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: Service,
    @Inject(DOCUMENT) private _document: Document

  ) {}

  ngOnInit() {
    this.datas = this.data;
    this.tasks = this.data.user['tasks'];
  }
  onComplete(task: { id: number }) {
    const state = { state: 'DONE' };
    this.service
      .completeTask(task.id, state)
      .subscribe(() => this._document.defaultView.location.reload(),
      (error) => error);
  }
  onUnComplete(task: { id: number }) {
    const state = { state: 'To Do' };
    this.service
      .completeTask(task.id, state)
      .subscribe(() => this._document.defaultView.location.reload(),
      (error) => error);
  }
  onDeleteTask(id: string) {
    this.service.deleteTask(id).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
}
