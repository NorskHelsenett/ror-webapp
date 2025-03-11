import { FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniquePropertyValidator(propertyName: string): ValidatorFn {
  return (formArray: FormArray): ValidationErrors | null => {
    const keys = formArray?.value?.map((value: any) => value[propertyName]);

    let hasDuplicates = false;
    const keyThatExists = [];
    for (const key of keys) {
      if (keyThatExists.includes(key)) {
        hasDuplicates = true;
        return { duplicateProperty: { propertyName } };
      }
      keyThatExists.push(key);
    }

    // Return validation error if duplicates are found
    //return hasDuplicates ? { duplicateProperty: { propertyName } } : null;

    return hasDuplicates ? { duplicateProperty: { propertyName } } : null;
  };
}
