import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersForm!: FormGroup;
  constructor(private fb: FormBuilder,private usersService: UsersService) {}
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

    this.usersService.getUserList().subscribe(res =>{
      console.log(res);
    });;
  }
}
