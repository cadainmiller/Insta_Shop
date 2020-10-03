import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AdminSideComponent } from './admin-component/admin-side/admin-side.component';
import { AdminNavbarComponent } from './admin-component/admin-navbar/admin-navbar.component';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { AddProductComponent } from './dialog/add-product/add-product.component';
import { ProfileComponent } from './dialog/profile/profile.component';
import { SettingsComponent } from './dialog/settings/settings.component';
import { ViewOrderComponent } from './dialog/view-order/view-order.component';
import { ViewInvoiceComponent } from './dialog/view-invoice/view-invoice.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    AdminSideComponent,
    AdminNavbarComponent,
    AddUserComponent,
    AddProductComponent,
    ProfileComponent,
    SettingsComponent,
    ViewOrderComponent,
    ViewInvoiceComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],

  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    AdminSideComponent,
    AdminNavbarComponent,
  ],

  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
