// 代码生成时间: 2025-10-12 18:09:45
import { Component, OnInit } from '@angular/core';
import { MemoryService } from './memory.service'; // Assume MemoryService is responsible for memory operations
import { MemoryInfo } from './memory-info.model'; // Assume MemoryInfo is a model for memory information

@Component({
  selector: 'app-memory-usage-analyzer',
  templateUrl: './memory-usage-analyzer.component.html',
  styleUrls: ['./memory-usage-analyzer.component.css']
})
export class MemoryUsageAnalyzerComponent implements OnInit {
  // Model to hold memory information
  memoryInfo: MemoryInfo;
  // Flag to indicate if memory data is being fetched
  isLoading: boolean = false;
  // Error message in case of failure
  errorMessage: string = '';

  constructor(private memoryService: MemoryService) { }

  ngOnInit(): void {
    this.fetchMemoryInfo();
  }

  // Method to fetch memory usage data
  fetchMemoryInfo(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.memoryService.getMemoryInfo()
      .subscribe({
        next: (data) => {
          this.memoryInfo = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to fetch memory usage data';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  // Method to handle memory data refresh
  refreshMemoryData(): void {
    this.fetchMemoryInfo();
  }
}
