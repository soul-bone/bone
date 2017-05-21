import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*
 * Routing
 */
import { routing } from "./app.routes";

/*
 * dynamic metadata
 */
import { MetadataModule, MetadataLoader, MetadataStaticLoader, PageTitlePositioning } from 'ng2-metadata';

import { AppComponent } from './app.component';

export function metadataFactory() {
  return new MetadataStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: '|',
    applicationName: 'soul-bone',
    defaults: {
      title: 'soul-bone',
      keywords: 'soul, bone, soul-bone',
      description: 'soul, bone, soul-bone',
      // 'og:image': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg',
      // 'og:type': 'website',
      // 'og:locale': 'zh-cn',
      // 'og:locale:alternate': 'nl_NL,tr_TR'
    }
  });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MetadataModule.forRoot({
      provide: MetadataLoader,
      useFactory: (metadataFactory)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
