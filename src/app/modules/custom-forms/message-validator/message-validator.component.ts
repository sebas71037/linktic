import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-validator',
  templateUrl: './message-validator.component.html',
  styleUrls: ['./message-validator.component.scss']
})
export class MessageValidatorComponent implements OnInit {

  @Input() name: string = "";
  @Input() configMessages = {};
  
  control!: AbstractControl;

  constructor(
    private controlContainer: ControlContainer
  ) { }

  get errorMessage() {
    if (!this.control) return null;

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.getValidatorErrorMessage(propertyName, this.configMessages, this.control.errors[propertyName]);
      }
    }
    return null;
  }

  ngOnInit() {
    this.control = (this.controlContainer.control as FormGroup).controls[this.name];
  }

  private getValidatorErrorMessage(validatorName: string, configMessages: any,  validatorValue?: any) {
    return configMessages && configMessages[validatorName] ? configMessages[validatorName] : '';
  }

}
