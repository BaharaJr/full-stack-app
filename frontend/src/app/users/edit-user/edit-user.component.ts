import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Service } from 'src/services/base.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: Service,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    this.userForm = this.generateForm();
  }
  onCancel(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
  generateForm() {
    this.userSubscription = this.data.user;
    return this.fb.group({
      firstname: new FormControl(this.data.user.firstname),
      lastname: new FormControl(this.data.user.lastname),
    });
  }
  onSave(e) {
    e.stopPropagation();
    const user = { ...this.userForm.value };
    this.service.editUser(this.userSubscription['id'], user).subscribe(
      () => this._document.defaultView.location.reload(),
      (error) => error
    );
  }
}
