import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { firstValueFrom, Observable, Subject, timer } from 'rxjs';
import { IPerson } from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.scss']
})
export class SelectPersonComponent implements OnInit{

  @Input() persons!: Observable<IPerson[]>;
  @Input() control!: AbstractControl;
  
  public search!: FormControl;
  public searchField: string = 'fullName';

  public selectedPerson!: IPerson;

  constructor(
    private fb: FormBuilder
  ) {
    this.build();
  }

  private build(): void {
    this.search = this.fb.control(null, []);
  }

  ngOnInit(): void {
    this.selectedPerson = this.control.value ?? null;
    this.onBlur();
  }

  public identify(index: number, person: IPerson) {
    return person.id;
  }

  public select(person: IPerson): void {
    this.selectedPerson = person;
    this.control.patchValue({...person});
    this.onBlur();
  }

  public async onFocus(): Promise<void> {
    this.search.patchValue('');
  }

  public async onBlur(): Promise<void> {
    await firstValueFrom(timer(400));
    this.search.patchValue( this.selectedPerson?.id? this.selectedPerson.fullName : '');
  }
}
