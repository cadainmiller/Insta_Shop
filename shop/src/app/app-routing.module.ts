import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component/components/main/main.component';
import { HomeComponent } from './component/components/pages/home/home.component';
import { ProductComponent } from './component/components/pages/product/product.component';
import { DashboardComponent } from './component/components/dashboard/dashboard.component';
import { AdminPanelComponent } from './component/components/pages/admin-panel/admin-panel.component';
import { LoginComponent } from './component/components/login/login.component';
import { LoginUpdateComponent } from './component/components/login-update/login-update.component';
import { NotfoundComponent } from './component/components/notfound/notfound.component';
import { AuthGuard } from './component/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AdminPanelComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
