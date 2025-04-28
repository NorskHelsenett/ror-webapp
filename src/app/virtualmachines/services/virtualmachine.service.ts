import { Injectable } from '@angular/core';
import { Resource } from '@rork8s/ror-resources/models';

@Injectable({
  providedIn: 'root',
})
export class VirtualmachineService {
  private virtualmachine: Resource | undefined;

  setVirtualMachine(vm: Resource): void {
    this.virtualmachine = vm;
  }

  getVirtualMachine(): Resource | undefined {
    return this.virtualmachine;
  }

  getSSHCommand(username: string): string {
    return `ssh ${username}@${this.virtualmachine?.metadata?.name}`;
  }

  getMstscCommand(): string {
    return `mstsc /v:${this.virtualmachine?.metadata?.name}`;
  }

  convertBytesToGigabytes(bytes: number): number {
    return bytes / 1024 / 1024 / 1024;
  }
}
