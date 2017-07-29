/*
 * Angular Imports
 */
import { Routes, RouterModule } from "@angular/router";

/*
 * Components
 */
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { WxUserComponent } from "./wx-user/wx-user.component";
import { SuccessComponent } from "./register/success.component";
import { ActivateComponent } from "./activate/activate.component";
import { ActivateCardComponent } from "./activate/activate-card.component";
import { OrderAddComponent } from "./order/order-add.component";
import { OrderInfoComponent } from "./order/order-info.component";
import { OrderModifyComponent } from "./order/order-modify.component";

const base : string = ""

/*
 * Routes
 */
const routes: Routes = [
  // { path: "", redirectTo: base + "getopenid", pathMatch: "full" },
  { path: '', redirectTo: 'getopenid' ,pathMatch: 'full'},
  {
    path: 'app',
    component: AppComponent,
    data: {
      metadata: {
        title: '首页',
        keywords: 'koru',
        description: 'koru'
      }
    }
  },
    {
    path: 'getopenid',
    component: WxUserComponent,
  },
    {
    path: base + 'register',
    component: RegisterComponent,
    data: {
      metadata: {
        title: '用户注册',
        description: 'koru register'
      }
    }
  },
  {
    path: base + 'register-success',
    component: SuccessComponent,
    data: {
      metadata: {
        title: '注册成功',
        description: 'koru register-success'
      }
    }
  },
    {
    path: base + 'activate',
    component: ActivateComponent,
    data: {
      metadata: {
        title: '卡片激活',
        description: 'koru activate'
      }
    }
  },
    {
    path: base + 'activate-card',
    component: ActivateCardComponent,
    data: {
      metadata: {
        title: '卡片信息',
        description: 'koru card'
      }
    }
  },
  {
    path: base + 'order-add',
    component: OrderAddComponent,
    data: {
      metadata: {
        title: '订单详情',
        description: 'koru order'
      }
    }
  },
  {
    path: base + 'order-info',
    component: OrderInfoComponent,
    data: {
      metadata: {
        title: '订单详情',
        description: 'koru order'
      }
    }
  },
  {
    path: base + 'order-modify',
    component: OrderModifyComponent,
    data: {
      metadata: {
        title: '订单详情',
        description: 'koru order'
      }
    }
  },
  { path: "**", component: WxUserComponent },
];

/*
 * Routes Provider
 */
export const routing = RouterModule.forRoot(routes);
