import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AdminSideComponent } from './admin-component/admin-side/admin-side.component';
import { AdminNavbarComponent } from './admin-component/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    AdminSideComponent,
    AdminNavbarComponent,
  ],
  imports: [CommonModule, RouterModule],

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
