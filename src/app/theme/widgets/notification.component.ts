import { Component, Input } from '@angular/core';
import { OrdersService } from 'app/routes/orders/orders.service';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button matTooltip="Nhấp để xem mã đơn hàng mới đặt" class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>notifications</mat-icon>
      <span class="badge bg-red-500">{{ count }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <mat-nav-list>
        <mat-list-item *ngFor="let message of messages">
          <a matLine>{{ message }}</a>
          <button mat-icon-button>
            <mat-icon>info</mat-icon>
          </button>
        </mat-list-item>
      </mat-nav-list>
    </mat-menu>
  `,
})
export class NotificationComponent {
  audio = new Audio('./assets/sound/toast_sound.mp3');
  messages = [];
  count!: number;
  minutes!: number;
  @Input()
  intervalPeriod!: number;
  subscription!: Subscription;
  constructor(private orderService: OrdersService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.subscription = interval(30000).subscribe((x => {
      this.getNotifications();
    }));
  }

  onBeforeOpen() {
    this.audio.play();
    this.toastr.warning("Bạn có đơn hàng mới đặt!");
  }

  getNotifications() {
    this.orderService.getListNewOrders().subscribe(res => {
      this.count = res.content.length;
      if (this.count > 0) {
        this.onBeforeOpen();
      }
      this.messages = res.content.map(x => x.orderCode);
    })
  }
}
