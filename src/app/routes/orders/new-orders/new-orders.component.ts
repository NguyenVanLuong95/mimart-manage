import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import * as moment from 'moment';
import { NewOrdersDetailComponent } from '../new-orders-detail/new-orders-detail.component';
import { OrdersService } from '../orders.service';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';

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
  pdfSrc = {}
  columns: MtxGridColumn[] = [
    { header: 'Tên khách hàng', field: 'customerName' },
    { header: 'Địa chỉ', field: 'customerAdrress' },
    { header: 'Số điện thoại', field: 'customerPhone' },
    { header: 'Mã đơn hàng', field: 'orderCode' },
    { header: 'Ngày tạo', field: 'createdDate' },
    { header: 'Tổng giá', field: 'totalAmount', type: 'number' },
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
          icon: 'remove_red_eye',
          tooltip: 'Xem chi tiết đơn hàng',
          click: record => this.edit(record),
        },
        {
          type: 'icon',
          icon: 'panorama_fish_eye',
          tooltip: 'Xem hóa đơn',
          click: record => this.viewBill(record),
        },
        {
          type: 'icon',
          icon: 'cloud_download',
          tooltip: 'Tải hóa đơn',
          click: record => this.downloadBill(record),
        },
      ],
    },
  ];
  constructor(private fb: FormBuilder, private serviceOrders: OrdersService, private cdr: ChangeDetectorRef, public dialog: MtxDialog) { }
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
  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(NewOrdersDetailComponent, {
      width: '600px',
      data: { record: value.productList, orderId: value.billId },
    });
  }
  viewBill(value: any) {
    if (value.billId) {
      this.serviceOrders.viewBill(value.billId).subscribe(res => {
        const reader = new FileReader();
        const binaryString = reader.readAsDataURL(res);
        reader.onload = (event: any) => {
          this.pdfSrc = event.target.result;
          const dialogRef = this.dialog.originalOpen(ViewPdfComponent, {
            width: '600px',
            data: { pdf_Src: this.pdfSrc },
          });
        };
      })
    }
  }
  downloadBill(value: any) {

  }
}
