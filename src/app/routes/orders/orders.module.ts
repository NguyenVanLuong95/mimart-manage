import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CanceledComponent } from './canceled/canceled.component';
import { NewOrdersDetailComponent } from './new-orders-detail/new-orders-detail.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ShippedComponent } from './shipped/shipped.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';

const COMPONENTS: any[] = [NewOrdersComponent, ShippingComponent, ShippedComponent, CanceledComponent, NewOrdersDetailComponent, ShippingDetailComponent, ViewPdfComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, OrdersRoutingModule, PdfViewerModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class OrdersModule {}
