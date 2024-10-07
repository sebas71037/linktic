import { FormArray, FormControl, FormGroup } from "@angular/forms";

export function uniqueFullNameValidator(controlName: string, idName: string) {
    return (control: FormControl) => {
      if (!control) return;
      const group = control.parent as FormGroup;

      if (!group) return;
      const arr = group.parent as FormArray;

      const peopleNames = arr.controls.filter(g => g.get(idName)?.value != group.get(idName)?.value).map(g => g.get(controlName)?.value);
      const currentName = control.value;

      const isUnique = !peopleNames.includes(currentName);
      return isUnique ? null : { notunique: true };
    };
}