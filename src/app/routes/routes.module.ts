import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';

import { UsersComponent } from './users/users.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoryAddEditComponent } from './categories/category_add_edit/category_add_edit.component';
import { ProductAddEditComponent } from './products/product_add_edit/product_add_edit.component';
import { NotificationAddEditComponent } from './notifications/notification_add_edit/notification_add_edit.component';

const COMPONENTS: any[] = [DashboardComponent, LoginComponent, RegisterComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    UsersComponent,
    NotificationsComponent,
    CategoriesComponent,
    ProductsComponent,
    WarehousesComponent,
    OrdersComponent,
    CategoryAddEditComponent,
    ProductAddEditComponent,
    NotificationAddEditComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
