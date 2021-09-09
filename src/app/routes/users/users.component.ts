import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from './users.service';
import { MtxGridColumn } from '@ng-matero/extensions';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Họ tên', field: 'userName' },
    { header: 'Email', field: 'email' },
    { header: 'Số điện thoại', field: 'phone' },
    { header: 'Vai trò', field: 'roleId', type: 'number' },
    { header: 'Trạng thái', field: 'isActive', type: 'boolean' },
  ];
  constructor(private fb: FormBuilder, private serviceUsers: UsersService) {}
  ngOnInit(): void {
    this.usersForm = this.fb.group({
      username: [''],
      email: [''],
      phone: [''],
    });
    this.getListUser();
  }

  getListUser() {
    this.isLoading = true;
    this.serviceUsers.getListUsers().subscribe((res: any) => {
      this.list = res.content;
      this.total = res.numberOfElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.per_page = e.pageSize;
    this.getListUser();
  }
}
