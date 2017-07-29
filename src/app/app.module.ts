import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

// import {SelectModule} from 'ng2-select';

/**
 * Modules
 */
 import {AuthModule} from './auth/auth.module';

/*
 * Routing
 */
import { routing } from "./app.routes";

/*
 * dynamic metadata
 */
import { MetadataModule, MetadataLoader, MetadataStaticLoader, PageTitlePositioning } from 'ng2-metadata';

import { AppComponent } from './app.component';
import { RegisterComponent } from "./register/register.component";
import { TimerCountComponent } from "./register/timer-count.component";
import { SuccessComponent } from "./register/success.component";
import { ActivateComponent } from "./activate/activate.component";
import { ActivateCardComponent } from "./activate/activate-card.component";
import { OrderAddComponent } from "./order/order-add.component";
import { OrderInfoComponent } from "./order/order-info.component";
import { OrderModifyComponent } from "./order/order-modify.component";
import { WxUserComponent } from "./wx-user/wx-user.component";

export function metadataFactory() {
  return new MetadataStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: '|',
    applicationName: '佳实乳业',
    defaults: {
      title: '佳实乳业',
      keywords: '佳实乳业',
      description: '佳实乳业',
      // 'og:image': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg',
      // 'og:type': 'website',
      // 'og:locale': 'zh-cn',
      // 'og:locale:alternate': 'nl_NL,tr_TR'
    }
  });
}


@NgModule({
  declarations: [
    AppComponent,WxUserComponent,
    RegisterComponent,TimerCountComponent,
    SuccessComponent,
    ActivateComponent,ActivateCardComponent,
    OrderAddComponent,OrderInfoComponent,OrderModifyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,JsonpModule,
    routing,
    MetadataModule.forRoot({
      provide: MetadataLoader,
      useFactory: (metadataFactory)
    }),
    AuthModule,
    // SelectModule,
    Ng2BootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
