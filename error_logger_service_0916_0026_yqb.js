// 代码生成时间: 2025-09-16 00:26:23
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {

  constructor(private http: HttpClient) {}

  /**
   * Log an error to the console and optionally send it to a remote server.
   * @param error The error object to log.
   * @param additionalInfo Optional additional information to include with the error.
   * @returns An Observable that can be used to handle the response from the server.
   */
  logError(error: any, additionalInfo?: any): Observable<any> {
    try {
      // Log the error to the console
      console.error('Error:', error);

      // If additional information is provided, log it as well
      if (additionalInfo) {
        console.error('Additional Info:', additionalInfo);
      }

      // Send the error to a remote server if configured (this is just a placeholder)
      // const url = 'https://your-error-logging-service.com/log';
      // return this.http.post(url, { error, additionalInfo }).pipe(
      //   catchError(this.handleError)
      // );

      // For now, return an Observable that just completes
      return of(null);
    } catch (logError) {
      // If logging the error fails, log it to the console
      console.error('Error logging error:', logError);
      return of(null);
    }
  }

  /**
   * Handle HTTP errors using a simple strategy.
   * @param error The error object.
   * @returns An Observable that just completes.
   */
  private handleError(error: any): Observable<any> {
    // Log the error
    this.logError(error);

    // Return an Observable that just completes
    return of(null);
  }
}
