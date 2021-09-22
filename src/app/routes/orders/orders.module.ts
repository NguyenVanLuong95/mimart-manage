import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CanceledComponent } from './canceled/canceled.component';
import { NewOrdersDetailComponent } from './new-orders-detail/new-orders-detail.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ShippedDetailComponent } from './shipped-detail/shipped-detail.component';
import { ShippedComponent } from './shipped/shipped.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { ShippingComponent } from './shipping/shipping.component';

const COMPONENTS: any[] = [NewOrdersComponent, ShippingComponent, ShippedComponent, CanceledComponent, NewOrdersDetailComponent, ShippedDetailComponent, ShippingDetailComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, OrdersRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class OrdersModule {}
