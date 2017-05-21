/*
 * Angular Imports
 */
import { Routes, RouterModule } from "@angular/router";

/*
 * Components
 */
import { AppComponent } from "./app.component";

/*
 * Routes
 */
const routes: Routes = [
  { path: "", redirectTo: "app", pathMatch: "full" },
  {
    path: 'app',
    component: AppComponent,
    data: {
      metadata: {
        title: 'bone app',
        keywords: 'bone, soul, soul-bone',
        description: 'Home, home bone home... and what?'
      }
    }
  },
  {
    path: 'home',
    component: AppComponent,
    data: {
      metadata: {
        title: 'bone home',
        description: 'Have you seen my bone home?'
      }
    }
  },
  {
    path: 'welcome',
    component: AppComponent,
    data: {
      metadata: {
        title: 'bone welcome',
        override: true, // prevents appending/prepending the application name to the title attribute
        description: 'override bone for welcome!'
      }
    }
  }

];

/*
 * Routes Provider
 */
export const routing = RouterModule.forRoot(routes);
