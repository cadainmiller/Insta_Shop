import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component/components/main/main.component';
import { HomeComponent } from './component/components/pages/home/home.component';
import { ProductComponent } from './component/components/pages/product/product.component';
import { DashboardComponent } from './component/components/dashboard/dashboard.component';
import { AdminPanelComponent } from './component/components/pages/admin-panel/admin-panel.component';


const routes: Routes = [
 {
   path: '',
   component: MainComponent,
   children: [
     {
       path: '',
       component: HomeComponent
     },
     {
      path: 'product',
      component: ProductComponent
    }
   ]
 },
 {
   path: 'dashboard',
   component: DashboardComponent,
   children: [
     {
       path: '',
       component: AdminPanelComponent
     }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
