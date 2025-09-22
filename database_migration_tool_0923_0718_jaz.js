// 代码生成时间: 2025-09-23 07:18:55
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // 导入环境配置

// DatabaseMigrationService 服务用于处理数据库迁移操作
@Injectable({
  providedIn: 'root'
})
export class DatabaseMigrationService {
  
  // 构造函数
  constructor(private http: HttpClient) {
  }
  
  /**
   * 执行数据库迁移操作
   * @returns Observable<any> 包含迁移结果的Observable对象
   */
  performMigration(): Observable<any> {
    // 定义API端点
    const apiEndpoint = environment.apiEndpoint + '/database/migrate';
    
    // 发送GET请求以触发数据库迁移
    return this.http.get(apiEndpoint).pipe(
      // 捕获并处理错误
      catchError(this.handleError)
    );
  }
  
  /**
   * 处理错误
   * @param error 错误对象
   * @returns Observable<any> 包含错误信息的Observable对象
   */
  private handleError(error: any): Observable<any> {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = `An error occurred: ${error.error.message}`;
    } else {
      errMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}

// 环境配置文件（environment.ts）
export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/api'
};