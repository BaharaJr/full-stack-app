import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/services/base.service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: any;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'actions'];

  //paginatorHtmlElement: ElementRef;

  constructor(
    private service: Service,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers().subscribe((users) => {
      console.log(users);
      this.users = new MatTableDataSource<any>(users.users);
      this.users.paginator = this.paginator;
    });
  }
  onAddUser(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    this.dialog.open(AddUserComponent, {
      height: 'auto',
      width: 'auto',
    });
  }
  onDeleteUser(id: string) {
    this.service.deleteUser(id).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
  onEditUser(e: any, user: any) {
    this.dialog.open(EditUserComponent, {
      data: { user: user },
      height: 'auto',
      width: 'auto',
    });
  }
  onViewTasks(e: any, user: any) {
    this.dialog.open(ViewTasksComponent, {
      data: { user: user },
      height: 'auto',
      width: 'auto',
    });
  }
}
