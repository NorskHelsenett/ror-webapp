import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OsComponent } from '../../../shared/components/os/os.component';
import { OperationSystemFamilies } from '../../../core/models/operationsystemfamilies';

@Component({
  selector: 'app-virtualmachine-os',
  standalone: true,
  imports: [TranslateModule, OsComponent],
  templateUrl: './virtualmachine-os.component.html',
  styleUrl: './virtualmachine-os.component.scss',
})
export class VirtualmachineOsComponent {
  @Input() virtualmachine: any | undefined;

  getOsFamily(): OperationSystemFamilies {
    const osFamily = this.virtualmachine?.virtualmachine?.status?.operatingSystem?.family;
    switch (String(osFamily)?.toLowerCase()) {
      case 'linux':
      case 'debian':
      case 'ubuntu':
      case 'centos':
      case 'fedora':
      case 'redhat':
      case 'suse':
      case 'rhel':
      case 'rhel7':
      case 'rhel8':
      case 'rhel9':
        return OperationSystemFamilies.Linux;
      case 'windows':
      case 'win':
      case 'win7':
      case 'win8':
      case 'win10':
      case 'win11':
      case 'win2012':
      case 'win2016':
      case 'win2019':
      case 'win2022':
      case 'winserver':
      case 'windows server':
        return OperationSystemFamilies.Windows;
      case 'mac':
      case 'darwin':
      case 'osx':
      case 'macos':
      case 'macosx':
      case 'macos x':
        return OperationSystemFamilies.Mac;
      default:
        return OperationSystemFamilies.Unknown;
    }
  }
}
