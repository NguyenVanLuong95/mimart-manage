import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  q = {
    username: '',
    email: '',
    phone: '',
  };
  ngOnInit(): void {
    this.usersForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
}
