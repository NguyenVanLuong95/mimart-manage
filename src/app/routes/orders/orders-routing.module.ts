import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanceledComponent } from './canceled/canceled.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { ShippedComponent } from './shipped/shipped.component';
import { ShippingComponent } from './shipping/shipping.component';


const routes: Routes = [
  { path: 'new-orders', component: NewOrdersComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'shipped', component: ShippedComponent },
  { path: 'canceled', component: CanceledComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
