import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Service } from 'src/services/base.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  userSubscription: Subscription;
  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
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
    return this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    });
  }
  onSave(e) {
    e.stopPropagation();
    const user = { ...this.userForm.value };
    console.log(user)
     this.service.addUser( user).subscribe(
     () => this._document.defaultView.location.reload(),
      (error) => error
   );
  }
}
