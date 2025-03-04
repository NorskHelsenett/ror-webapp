import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NodepoolService {
  public nodepoolForm: FormGroup | undefined;
}
