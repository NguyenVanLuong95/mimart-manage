import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NotificationAddEditService } from './notification_add_edit.service';

@Component({
  selector: 'app-notifications-notification_add_edit',
  templateUrl: './notification_add_edit.component.html',
})
export class NotificationAddEditComponent implements OnInit {
  addNotificationForm = new FormGroup({});
  checkForm: boolean = false;
  id: any;

  constructor(
    private fb: FormBuilder,
    private notificationAddEditService: NotificationAddEditService,
    public dialogRef: MatDialogRef<NotificationAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.addNotificationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    if (this.data) {
      this.checkForm = true;
      this.id = this.data.record.id;
      this.addNotificationForm.controls['title'].setValue(this.data.record.title);
      this.addNotificationForm.controls['content'].setValue(this.data.record.content);
    } else {
      this.checkForm = false;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave() {
    const body = {
      'title': this.addNotificationForm.controls.title.value,
      'content': this.addNotificationForm.controls.content.value
    }
    this.notificationAddEditService.onSave(body).subscribe(res => {
      if (res) {
        this.toastr.success("Thêm mới thông báo thành công!");
        this.onClose();
      } else {
        this.toastr.error("Thêm mới thông báo thất bại!")
      }
    });
  }

  onSaveEdit() {
    const body = {
      'id': this.id,
      'title': this.addNotificationForm.controls.title.value,
      'content': this.addNotificationForm.controls.content.value
    }
    this.notificationAddEditService.onSaveEdit(body).subscribe(res => {
      if (res) {
        this.toastr.success("Cập nhật thông báo thành công!");
        this.onClose();
      } else {
        this.toastr.error("Cập nhật thông báo thất bại!")
      }
    });
  }
}
