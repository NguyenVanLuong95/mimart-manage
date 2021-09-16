import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import * as moment from 'moment';
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
    { header: 'Thời gian', field: 'createAt' }
  ];
  constructor(private fb: FormBuilder, private serviceNotifications: NotificationsService, private cdr: ChangeDetectorRef, public dialog: MtxDialog) { }
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
    this.isLoading = true;
    this.serviceNotifications.getListNotifications(this.params).subscribe((res: any) => {
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
}
