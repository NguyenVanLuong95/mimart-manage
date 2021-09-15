import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CanceledComponent } from './canceled/canceled.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ShippedComponent } from './shipped/shipped.component';
import { ShippingComponent } from './shipping/shipping.component';


const COMPONENTS: any[] = [NewOrdersComponent, ShippingComponent, ShippedComponent, CanceledComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, OrdersRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class OrdersModule {}
