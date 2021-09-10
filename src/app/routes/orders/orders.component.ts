import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  usersForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Họ tên', field: 'userName' },
    { header: 'Email', field: 'email' },
    { header: 'Số điện thoại', field: 'phone' },
    { header: 'Vai trò', field: 'roleId', type: 'number' },
    { header: 'Trạng thái', field: 'isActive', type: 'boolean' },
  ];
  constructor(private fb: FormBuilder, private serviceUsers: UsersService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.usersForm = this.fb.group({
      username: [''],
      email: ['', [Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
      phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.getListUser();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListUser() {
    this.isLoading = true;
    this.serviceUsers.getListUsers(this.params).subscribe((res: any) => {
      this.list = res.content;
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListUser();
  }

  search() {
    this.query.page = 0;
    if (this.usersForm.controls['username'].value) {
      Object.assign(this.query, { username: this.usersForm.controls['username'].value })
    }
    if (this.usersForm.controls['email'].value) {
      Object.assign(this.query, { email: this.usersForm.controls['email'].value })
    }
    if (this.usersForm.controls['phone'].value) {
      Object.assign(this.query, { phone: this.usersForm.controls['phone'].value })
    }
    this.getListUser();
  }
}
