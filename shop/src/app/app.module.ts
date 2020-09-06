import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './component/shared/shared.module';
import { MainComponent } from './component/components/main/main.component';
import { ProductComponent } from './component/components/pages/product/product.component';
import { DashboardComponent } from './component/components/dashboard/dashboard.component';
import { AdminPanelComponent } from './component/components/pages/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    DashboardComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  
})
export class AppModule { }
