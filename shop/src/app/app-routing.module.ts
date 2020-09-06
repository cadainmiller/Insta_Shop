import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component/components/main/main.component';
import { HomeComponent } from './component/components/pages/home/home.component';
import { ProductComponent } from './component/components/pages/product/product.component';


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
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
