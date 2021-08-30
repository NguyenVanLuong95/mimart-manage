import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./category.component";

import { UserComponent } from "./user.component";
import { NotificationComponent } from "./notification.component";
import { OrderComponent } from "./order.component";
import { ProductListComponent } from "./product-list.component";
import { ProductComponent } from "./product.component";
import { TypographyComponent } from "./typography.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Theme",
    },
    children: [
      {
        path: "",
        redirectTo: "user",
      },
      {
        path: "user",
        component: UserComponent,
        data: {
          title: "user",
        },
      },
      {
        path: "category",
        component: CategoryComponent,
        data: {
          title: "category",
        },
      },
      {
        path: "product",
        component: ProductComponent,
        data: {
          title: "product",
        },
      },
      {
        path: "notification",
        component: NotificationComponent,
        data: {
          title: "notification",
        },
      },
      {
        path: "order",
        component: OrderComponent,
        data: {
          title: "order",
        },
      },
      {
        path: "product-list",
        component: ProductListComponent,
        data: {
          title: "product-list",
        },
      },
      {
        path: "typography",
        component: TypographyComponent,
        data: {
          title: "Typography",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
