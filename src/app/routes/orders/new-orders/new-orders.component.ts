import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions';
import * as moment from 'moment';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-new-orders',
  templateUrl: './new-orders.component.html',
})
export class NewOrdersComponent implements OnInit {
  newOrdersForm!: FormGroup;
  list: any[] = [];
  total = 0;
  isLoading = true;
  query = {
    page: 0,
    size: 10,
  };
  columns: MtxGridColumn[] = [
    { header: 'Mã đơn hàng', field: 'orderCode' },
    { header: 'Ngày tạo', field: 'createdDate' },
    { header: 'Tổng giá', field: 'totalAmount', type: 'number' },
  ];
  constructor(private fb: FormBuilder, private serviceOrders: OrdersService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.newOrdersForm = this.fb.group({
      code: [''],
    });
    this.getListNewOrders();
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  getListNewOrders() {
    const params = { ... this.newOrdersForm.value }
    params.page = this.query.page;
    params.size = this.query.size;
    if (!this.newOrdersForm.controls['code'].value) {
      delete params.code;
    }
    this.isLoading = true;
    this.serviceOrders.getListNewOrders(params).subscribe((res: any) => {
      this.list = res.content.map(x => {
        x.createdDate = moment(x.createdDate).format('hh:mm:ss DD/MM/YYYY');
        return x;
      });
      this.total = res.totalElements;
      this.isLoading = false;
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getListNewOrders();
  }

  search() {
    this.query.page = 0;
    if (this.newOrdersForm.controls['code'].value) {
      Object.assign(this.query, { code: this.newOrdersForm.controls['code'].value })
    }
    this.getListNewOrders();
  }
}
