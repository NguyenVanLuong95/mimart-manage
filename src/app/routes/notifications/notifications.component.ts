import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
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
    { header: 'Thời gian', field:'createAt' }
  ];
  constructor(private fb: FormBuilder, private serviceNotifications: NotificationsService, private cdr: ChangeDetectorRef) { }
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
      this.list = res.content;
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
}
