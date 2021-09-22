import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-shipped-detail',
  templateUrl: './shipped-detail.component.html',
})
export class ShippedDetailComponent implements OnInit {
  newOrdersForm!: FormGroup;
  list: any[] = [];
  orderId: any;
  total = 0;
  query = {
    page: 0,
    size: 10,
  };
  displayedColumns = ['productName', 'quantity', 'productImageUrl', 'amount'];
  constructor(
    public dialogRef: MatDialogRef<ShippedDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrdersService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.getData();
    this.orderId = this.data.orderId;
  }

  getData() {
    this.total = this.data.record ? this.data.record.length : 0;
    this.list = this.data.record.map((x) => {
      x.productImageUrl = `data:image/png;base64,${x.productImageBase64}`;
      return x;
    })
  }

  get params() {
    const p = Object.assign({}, this.query);
    return p;
  }

  onClose(): void {
    this.dialogRef.close();
  }
  onSendShipped(): void {
    this.orderService.onSendShipped(this.orderId).subscribe(res => {
      if (res) {
        this.toastr.success("Đơn hàng giao thành công!");
        this.onClose()
      } else {
        this.toastr.success("Đơn hàng giao thất bại!");
      }
    })
  }
}
