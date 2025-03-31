import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HexService {
  stringToSixCharHex(input: string): string {
    // Convert string to a numeric hash
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Convert to hex and ensure positive value
    const hex = (hash >>> 0).toString(16).toUpperCase();

    // Pad or truncate to 6 characters
    if (hex.length < 6) {
      return hex.padStart(6, '0');
    }
    return hex.slice(0, 6);
  }
}
