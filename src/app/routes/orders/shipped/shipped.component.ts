import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import * as moment from 'moment';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-shipped',
  templateUrl: './shipped.component.html',
})
export class ShippedComponent implements OnInit {
  shippedForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Tên khách hàng', field: 'customerName' },
    { header: 'Địa chỉ', field: 'customerAdrress' },
    { header: 'Số điện thoại', field: 'customerPhone' },
    { header: 'Mã đơn hàng', field: 'orderCode' },
    { header: 'Ngày tạo', field: 'createdDate' },
    { header: 'Tổng giá', field: 'totalAmount', type: 'number' },
    { header: 'Ghi chú', field: 'note' },
  ];
  constructor(private fb: FormBuilder, private serviceOrders: OrdersService, private cdr: ChangeDetectorRef, public dialog: MtxDialog) { }
  ngOnInit(): void {
    this.shippedForm = this.fb.group({
      code: [''],
    });
    this.getListShippedOrders();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListShippedOrders() {
    const params = { ... this.shippedForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.shippedForm.controls['code'].value) {
      delete params.code;
    }
    this.isLoading = true;
    this.serviceOrders.getListShippedOrders(params).subscribe((res: any) => {
      this.list = res.content.map(x => {
        x.createdDate = moment(x.createdDate).format('HH:mm:ss DD/MM/YYYY');
        return x;
      });
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListShippedOrders();
  }

  search() {
    this.query.page = 0;
    if (this.shippedForm.controls['code'].value) {
      Object.assign(this.query, { code: this.shippedForm.controls['code'].value })
    }
    this.getListShippedOrders();
  }
}
