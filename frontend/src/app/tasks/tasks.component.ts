import { DOCUMENT } from '@angular/common';
import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/services/base.service';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any;
  displayedColumns = ['id', 'title', 'description', 'state', 'actions'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private service: Service,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    this.service.getTasks().subscribe((task) => {
      const tasks = task.tasks
      this.tasks = new MatTableDataSource<any>(tasks);
      this.tasks.paginator = this.paginator;
    });
  }

  onAddtask(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    this.dialog.open(AddTaskComponent, {
      height: 'auto',
      width: 'auto',
    });
  }
  onEdittask(task) {}
  onDeleteTask(e) {
    this.service.deleteTask(e).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
  onComplete(task: { id: number }) {
    const state = { state: 'DONE' };
    this.service.completeTask(task.id, state).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
  onUnComplete(task: { id: number }) {
    const state = { state: 'To Do' };
    this.service.completeTask(task.id, state).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
}
