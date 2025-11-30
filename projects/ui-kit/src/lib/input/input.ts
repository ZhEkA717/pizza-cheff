import {ChangeDetectionStrategy, Component, computed, forwardRef, input, Signal, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ForbidDotDirective} from '@shared/directives/forbid-dot.directive';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import {MaskitoOptions} from '@maskito/core';
import {MaskitoDirective} from '@maskito/angular';

@Component({
  selector: 'lib-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ForbidDotDirective,
    MaskitoDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiKitInput),
      multi: true
    }
  ]
})
export class UiKitInput implements ControlValueAccessor {
  forbidDot = input(false);
  placeholder = input<string>('');
  type = input<'text' | 'tel'>('text');
  private readonly phoneMask = maskitoPhoneOptionsGenerator({
    countryIsoCode: 'BY',
    metadata,
  });
  readonly maskOptions: Signal<MaskitoOptions | null> = computed(() =>
    this.type() === 'tel' ? this.phoneMask : null
  );
  color = input<'success' | 'error' | 'primary'>('primary')


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
    let val = target.value;


    this.value.set(target.value);
    this.onChange(this.value());
  }
}
