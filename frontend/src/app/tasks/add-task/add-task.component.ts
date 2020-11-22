import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Service } from '../../../services/base.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  users: any;
  selectedUsers: any;
  searchKey: any = '';
  taskForm: FormGroup;
  taskSubscription: Subscription;
  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private fb: FormBuilder,
    private service: Service,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    this.service.getUsers().subscribe((users) => {
      this.users = users.users;
    });
    this.taskForm = this.generateForm();
  }
  onCancel(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
  generateForm() {
    return this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
    });
  }
  onSave(e) {
    e.stopPropagation();
    const task = { ...this.taskForm.value };
    task.userId = { id: `${this.selectedUsers.id}` };

    this.service.addtask(task).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
  searchUsers(e) {
  this.searchKey = e ? e.target.value.trim() : this.searchKey;
    console.log(this.searchKey);
  }
  selectedUser(e) {
    this.selectedUsers = e;
  }
}
