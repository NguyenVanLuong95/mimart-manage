import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave() {
    const formData = new FormData();
    formData.append('title', this.addNotificationForm.controls.title.value);
    formData.append('content', this.addNotificationForm.controls.content.value);
    this.notificationAddEditService.onSave(formData).subscribe(res => {
      debugger
      if (res.code == 1) {
        this.toastr.success(res.message);
        this.onClose();
      } else {
        this.toastr.error("Thêm mới thông báo thất bại!")
      }
    });
  }
}
