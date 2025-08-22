import { Injectable } from '@angular/core';
import { defaultIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderFeaturesService {
  isNodePoolEditable(provider: string, k8sversion: string): boolean {
    switch (provider) {
      case 'tanzu':
        return this.isTanzuNodePoolEditable(k8sversion);
      case 'talos':
        return this.isTalosNodePoolEditable(k8sversion);
      default:
        return false;
    }
  }

  isTanzuNodePoolEditable(k8sversion: string): boolean {
    // Remove 'v' prefix if present and extract major.minor version
    const versionWithoutV = k8sversion.replace(/^v/, '');
    const versionParts = versionWithoutV.split('.');

    if (versionParts.length < 2) {
      return false;
    }

    const major = parseInt(versionParts[0], 10);
    const minor = parseInt(versionParts[1], 10);

    // Check if version is at least 1.29.x
    //return major > 1 || (major === 1 && minor >= 29);
    return false;
  }

  isTalosNodePoolEditable(k8sversion: string): boolean {
    throw new Error('Method not implemented.');
  }
}
