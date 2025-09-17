// 代码生成时间: 2025-09-18 03:28:17
import { Component } from '@angular/core';

@Component({
  selector: 'app-random-number-generator',
  template: `
    <div>
      <input type="number" [(ngModel)]="min" placeholder="Minimum"/>
      <input type="number" [(ngModel)]="max" placeholder="Maximum"/>
      <button (click)="generateRandomNumber()">Generate</button>
      <p>Random Number: {{ randomNumber }}</p>
    </div>
  `,
  styles: []
})
export class RandomNumberGeneratorComponent {
  // Properties to hold the min and max values for the range
  min: number = 1;
  max: number = 100;
  // Property to hold the generated random number
  randomNumber: number;

  /**
   * Generates a random number between the min and max values.
   * If min or max is not a valid number, it displays an error message.
   */
  generateRandomNumber(): void {
    if (isNaN(this.min) || isNaN(this.max)) {
      console.error('Error: Min or Max is not a valid number.');
      return;
    }

    if (this.min > this.max) {
      console.error('Error: Min should not be greater than Max.');
      return;
    }

    // Generate a random number between the min and max values
    this.randomNumber = this.min + Math.floor(Math.random() * (this.max - this.min + 1));
  }
}
