import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lib-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiKitInput),
      multi: true
    }
  ]
})
export class UiKitInput implements ControlValueAccessor {
  placeholder = input<string>('');
  type = input<string>('text');

  value = signal('');
  disabled = false;

  private onChange = (value: any) => {
  };
  public onTouched = () => {
  };

  // Когда Angular записывает значение в компонент
  writeValue(value: any): void {
    this.value.set(value ?? '');
    this.onChange(this.value());
  }

  // Когда значение изменилось в UI
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Когда input потерял фокус
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Если форма делает input disabled
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // При вводе текста
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(this.value);
  }
}
