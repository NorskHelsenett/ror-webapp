import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  getColorForPercentage(percentage: number): string {
    if (percentage < 50) {
      return 'green';
    } else if (percentage < 80) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
