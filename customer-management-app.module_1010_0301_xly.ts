// 代码生成时间: 2025-10-10 03:01:45
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './customer.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

// CustomerManagementAppModule is the root module for the Customer Management application.
# FIXME: 处理边界情况
@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
# 改进用户体验
    HttpClientModule
  ],
  providers: [
# 改进用户体验
    CustomerService  // Provide the CustomerService for dependency injection.
  ],
  bootstrap: [CustomerListComponent]  // Bootstrap the CustomerListComponent.
})
# 扩展功能模块
export class CustomerManagementAppModule {
  // This class acts as the root module for the Angular application.
}
