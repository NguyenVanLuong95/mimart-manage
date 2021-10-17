import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import { PageEvent } from '@angular/material/paginator';
import { UserAddEditComponent } from './user_add_edit/user_add_edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
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
    { header: 'Vai trò', field: 'roleId' },
    { header: 'Trạng thái', field: 'isActive' },
    {
      header: 'Hành động',
      field: 'operation',
      minWidth: 100,
      width: '5%',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Sửa',
          click: record => this.edit(record),
        },
      ],
    },
  ];
  constructor(private fb: FormBuilder, private serviceUsers: UsersService, private cdr: ChangeDetectorRef, public dialog: MtxDialog) { }
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
    const params = { ... this.usersForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.usersForm.controls['username'].value) {
      delete params.username;
    }
    if (!this.usersForm.controls['email'].value) {
      delete params.email;
    }
    if (!this.usersForm.controls['phone'].value) {
      delete params.phone;
    }
    this.isLoading = true;
    this.serviceUsers.getListUsers(params).subscribe(res => {
      this.list = res.content.map(x => {
        x.isActive = x.isActive == true ? "Đang hoạt động" : "Không hoạt động";
        x.roleId = x.roleId == 1 ? "Quản trị" : "Người dùng";
        return x;
      })
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
    this.getListUser();
  }
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(UserAddEditComponent, {
      width: '600px',
      data: { record: value },
    });
    dialogRef.afterClosed().subscribe(() => { this.getListUser(); });
  }
}
