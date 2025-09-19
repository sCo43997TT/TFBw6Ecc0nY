// 代码生成时间: 2025-09-19 16:17:01
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReadableFileService } from './readable-file.service'; // Service for handling file operations

@Component({
  selector: 'app-text-file-analyzer',
  templateUrl: './text-file-analyzer.component.html',
  styleUrls: ['./text-file-analyzer.component.css']
})
export class TextFileAnalyzerComponent {
  content: string = '';
  statistics: any = {};
  loading: boolean = false;
  error: string | null = null;

  // Inject HttpClient and DomSanitizer for HTTP requests and sanitization
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private fileService: ReadableFileService) {}

  // Method to handle file selection and analysis
  onFileSelected(event: Event): void {
    this.error = null;
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      this.loadFileContent(file);
    }
  }

  // Method to load and analyze the file content
  private loadFileContent(file: File): void {
    this.loading = true;
    this.fileService.readTextFile(file).subscribe({
      next: (content) => {
        this.content = content;
        this.analyzeContent();
      },
      error: (err) => {
        this.error = 'Error loading file.';
        this.loading = false;
      }
    });
  }

  // Method to perform content analysis
  private analyzeContent(): void {
    if (!this.content) {
      return;
    }

    // Perform analysis on the content, for example:
    const words = this.content.split(/\s+/); // Split content into words based on whitespace
    const wordCount = words.length;
    const uniqueWords = new Set(words); // Create a set to store unique words
    const uniqueWordCount = uniqueWords.size;

    this.statistics = {
      wordCount: wordCount,
      uniqueWordCount: uniqueWordCount,
    };

    this.loading = false;
  }

  // Method to handle errors
  handleError(error: any): void {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}, Error Message: ${error.message}`;
    }
    this.error = errorMessage;
  }
}

/*
 * Readable File Service
 *
 * A service to handle file reading operations.
 */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReadableFileService {
  constructor() {}

  // Method to read the text content of a file
  readTextFile(file: File): Observable<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Observable<string>((observer) => {
      reader.onload = (e) => {
        observer.next(e.target?.result as string);
        observer.complete();
      };
      reader.onerror = (e) => {
        observer.error(e.target?.error);
      };
    }).pipe(
      catchError((error) => {
        return throwError(() => new Error('Could not read file'));
      }),
    );
  }
}
