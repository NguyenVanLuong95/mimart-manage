import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from './notifications.service';
import { NotificationAddEditComponent } from './notification_add_edit/notification_add_edit.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  notificationsForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Tiêu đề', field: 'title' },
    { header: 'Nội dung', field: 'content' },
    { header: 'Thời gian', field: 'createAt' },
    {
      header: 'Hành động',
      field: 'operation',
      minWidth: 120,
      width: '10%',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Sửa',
          click: record => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: 'Xóa',
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.delete(record),
        },
      ],
    },
  ];
  constructor(private fb: FormBuilder, private serviceNotifications: NotificationsService, private cdr: ChangeDetectorRef, public dialog: MtxDialog, private translate: TranslateService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.notificationsForm = this.fb.group({
      title: [''],
      content: [''],
    });
    this.getListNotifications();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListNotifications() {
    const params = { ... this.notificationsForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.notificationsForm.controls['title'].value) {
      delete params.title;
    }
    if (!this.notificationsForm.controls['content'].value) {
      delete params.content;
    }
    this.isLoading = true;
    this.serviceNotifications.getListNotifications(params).subscribe((res: any) => {
      this.list = res.content.map(x => {
        x.createAt = moment(x.createAt).format('hh:mm:ss DD/MM/YYYY');
        return x;
      });
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListNotifications();
  }

  search() {
    this.query.page = 0;
    if (this.notificationsForm.controls['title'].value) {
      Object.assign(this.query, { title: this.notificationsForm.controls['title'].value })
    }
    if (this.notificationsForm.controls['content'].value) {
      Object.assign(this.query, { content: this.notificationsForm.controls['content'].value })
    }
    this.getListNotifications();
  }

  addNotification() {
    const dialogRef = this.dialog.originalOpen(NotificationAddEditComponent, {
      width: '600px',
    });
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(NotificationAddEditComponent, {
      width: '600px',
      data: { record: value },
    });
  }
  delete(value: any) {
    if (value.id) {
      this.serviceNotifications.onDelete(value.id).subscribe(res => {
        if (res) {
          this.toastr.success("Xóa thông báo thành công!");
        } else {
          this.toastr.success("Xóa thông báo thất bại!");
        }
      })
    }
  }
}
