import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAddEditService } from './user_add_edit.service';

@Component({
  selector: 'app-users-user_add_edit',
  templateUrl: './user_add_edit.component.html',
})
export class UserAddEditComponent implements OnInit {
  editUserForm = new FormGroup({});
  roleId = ['Quản trị', 'Người dùng'];
  isActive = ['Đang hoạt động', 'Không hoạt động'];
  userId;
  constructor(
    private fb: FormBuilder,
    private userAddEditService: UserAddEditService,
    public dialogRef: MatDialogRef<UserAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.editUserForm = this.fb.group({
      userName: [''],
      phone: [''],
      role: [''],
      isActive: [''],
    });
    this.editUserForm.controls['userName'].setValue(this.data.record.userName);
    this.editUserForm.controls['phone'].setValue(this.data.record.phone);
    this.editUserForm.controls['role'].setValue(this.data.record.roleId);
    this.editUserForm.controls['isActive'].setValue(this.data.record.isActive);
    this.userId = this.data.record.id;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave() {
    let roleId;
    let isActive;
    (this.editUserForm.controls['role'].value == 'Quản trị') ? (roleId = 1) : (roleId = 2);
    (this.editUserForm.controls['isActive'].value == 'Đang hoạt động') ? (isActive = 1) : (isActive = 0);
    const formData = new FormData();
    formData.append('id', this.userId,);
    formData.append('roleId', roleId);
    formData.append('isActive', isActive);
    this.userAddEditService.onSave(formData).subscribe(res => {
      if (res) {
        this.toastr.success("Cập nhật thông tin người dùng thành công!");
        this.onClose();
        setTimeout(function () { window.location.reload(); }, 2000);
      } else {
        this.toastr.error("Cập nhật thông tin người dùng thất bại!")
      }
    });
  }
}
