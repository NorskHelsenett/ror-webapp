import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input-dropdown',
  imports: [TranslatePipe, SelectModule, ReactiveFormsModule, CheckboxModule, FormsModule],
  templateUrl: './input-dropdown.component.html',
  styleUrl: './input-dropdown.component.scss',
})
export class InputDropdownComponent {
  @Input() formGroup: FormGroup | undefined;
  @Input() controlName: string | undefined;

  @Input() couldOverride: boolean;
  @Input() groupSupport: boolean;
  @Input() showClear: boolean;
  @Input() clearTextOnOverride: boolean;

  @Input() options: any[] | undefined;
  @Input() optionLabel: string | undefined;
  @Input() optionValue: string | undefined;

  @Input() filterBy: string | undefined;

  @Input() placeholder: string | undefined;
  @Input() emptyListMessage: string | undefined;

  override: boolean;

  onOverride() {
    if (this.clearTextOnOverride) {
      this.formGroup?.get(this.controlName)?.setValue('');
      this.formGroup?.get(this.controlName)?.markAsPristine();
    }
  }
}
