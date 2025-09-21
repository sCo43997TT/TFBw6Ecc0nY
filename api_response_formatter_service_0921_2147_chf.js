// 代码生成时间: 2025-09-21 21:47:05
import { Injectable } from '@angular/core';

/**
 * API响应格式化工具服务
 * 提供API响应格式化功能，便于前端处理和显示
 */
@Injectable({
  providedIn: 'root'
})
export class ApiResponseFormatterService {
  
  /**
   * 格式化API响应数据
   * @param {Object} response - 原始API响应对象
   * @returns {Object} 格式化后的响应数据
   */
  formatResponse(response: any): any {
    // 检查响应对象是否有效
    if (!response) {
      throw new Error('Invalid API response');
    }

    // 检查响应对象是否包含必要的属性
    if (!response.data || !response.status) {
      throw new Error('Missing required properties in API response');
    }
    
    // 格式化响应数据
    const formattedData = {
      data: response.data,
      status: response.status,
      message: response.message || 'No message'
    };
    
    // 返回格式化后的数据
    return formattedData;
  }

  /**
   * 处理API响应错误
   * @param {Object} error - 错误对象
   * @returns {Object} 错误信息
   */
  handleError(error: any): any {
    // 检查错误对象是否有效
    if (!error) {
      throw new Error('Invalid error object');
    }

    // 提取错误信息
    const errorMessage = error.error.message || error.message || 'Unknown error';
    
    // 返回错误信息
    return {
      error: true,
      message: errorMessage
    };
  }
}
