import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isValidPhoneNumber} from 'libphonenumber-js';

export function phoneValidator(countryCode: 'BY' | 'RU' | 'KZ'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Не проверяем, если поле пустое (для этого есть Validators.required)
    if (!value) {
      return null;
    }

    // Используем isValidPhoneNumber для проверки.
    // Она вернет true, только если номер полный и корректный для указанной страны.
    const isValid = isValidPhoneNumber(value, countryCode);

    // Если номер невалидный, возвращаем объект ошибки.
    // Если валидный - возвращаем null.
    return isValid ? null : {invalidPhone: true};
  };
}
