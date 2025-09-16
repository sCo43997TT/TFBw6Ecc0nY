// 代码生成时间: 2025-09-16 08:25:49
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'; // Import the environment configuration
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityAuditLogService {

  // Base URL for the audit log API
  private auditLogApiUrl = environment.auditLogApiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Logs a security event to the audit log service.
   * @param event The security event to be logged.
   * @returns An Observable that emits the result of the log operation.
   */
  logSecurityEvent(event: any): Observable<any> {
    try {
      // Send the security event to the audit log API
      return this.http.post(this.auditLogApiUrl, event).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      // Handle any errors that occur during the logging process
      console.error('Error logging security event:', error);
      return throwError(error);
    }
  }

  /**
   * Private method to handle errors that occur during HTTP requests.
   * @param error The error that occurred.
   * @returns An Observable that emits an error message.
   */
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
