// Angular
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UserComponent } from "./user.component";
import { TypographyComponent } from "./typography.component";

// Theme Routing
import { ThemeRoutingModule } from "./theme-routing.module";
import { CategoryComponent } from "./category.component";
import { ProductComponent } from "./product.component";
import { NotificationComponent } from "./notification.component";
import { OrderComponent } from "./order.component";
import { ProductListComponent } from "./product-list.component";

@NgModule({
  imports: [CommonModule, ThemeRoutingModule],
  declarations: [
    UserComponent,
    CategoryComponent,
    TypographyComponent,
    ProductComponent,
    NotificationComponent,
    OrderComponent,
    ProductListComponent,
  ],
})
export class ThemeModule {}
