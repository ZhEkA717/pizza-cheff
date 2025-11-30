import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  signal,
  ViewChild
} from '@angular/core';
import {Translation, TranslocoDirective, TranslocoService} from '@jsverse/transloco';
import {GlobalLoadingService} from '@ui-kit/src/lib/global-loading/global-loading.service';
import {Button} from '@ui-kit/src/lib/button/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PizzaCard, PlaceOrderForm} from '@core/modules/landing/interfaces/landing.interfaces';
import {delay, filter, finalize, of, switchMap, tap} from 'rxjs';
import {PizzaCardComponent} from '@core/modules/landing/components/pizza-card/pizza-card.component';
import {Skeleton} from '@ui-kit/src/lib/skeleton/skeleton';
import {UiKitInput} from '@ui-kit/src/lib/input/input';
import {ForbidDotDirective} from '@shared/directives/forbid-dot.directive';
import {NgTemplateOutlet} from '@angular/common';
import {
  TuiButton, TuiDialogComponent, TuiDialogContext,
  TuiDialogService,
  TuiPopup,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTitle
} from '@taiga-ui/core';
import {TUI_CONFIRM, TuiDrawer, TuiInputRange} from '@taiga-ui/kit';
import {TuiRepeatTimes} from '@taiga-ui/cdk';

@Component({
  selector: 'app-landing',
  imports: [
    TranslocoDirective,
    Button,
    FormsModule,
    PizzaCardComponent,
    Skeleton,
    UiKitInput,
    ReactiveFormsModule,
    ForbidDotDirective,
    NgTemplateOutlet,
    TuiButton,
    TuiDrawer,
    TuiPopup,
    TuiTitle,
    TuiTextfieldComponent,
    TuiInputRange,
    TuiTextfieldDirective,
    TuiRepeatTimes,
    TuiDialogComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LandingComponent {
  private translocoService = inject(TranslocoService);
  private globalLoadingService = inject(GlobalLoadingService);
  private readonly dialogs = inject(TuiDialogService);

  protected readonly open = signal(false);
  cards = signal<PizzaCard[] | null>(null);
  private cdr = inject(ChangeDetectorRef);
  skeleton = signal(false);
  form: PlaceOrderForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    address: new FormControl<string | null>(null, Validators.required),
    phone: new FormControl<string | null>(null, Validators.required)
  })

  constructor() {
    this.translocoService.selectTranslation().pipe(
      takeUntilDestroyed(),
      switchMap((trl) => this.getCards(trl))
    ).subscribe(cards => {
      this.cards.set(cards);
    })
  }

  public onClose(): void {
    this.open.set(false);
  }

  getCards(trl: Translation) {
    const data: PizzaCard[] = [
      {
        img: 'assets/images/landing/pizza-meat-deluxe.webp',
        title: trl['Meat-Deluxe'],
        subtitle: trl['Meat-Deluxe-subtitle'],
        alt: 'pizza-meat-deluxe'
      },
      {
        img: 'assets/images/landing/pizza-marine-premium.webp',
        title: trl['Marine-premium'],
        subtitle: trl['Marine-premium-subtitle'],
        alt: 'pizza-marine-premium'
      },
      {
        img: 'assets/images/landing/pizza-bekon-sausages.webp',
        title: trl['Bacon-and-sausages'],
        subtitle: trl['Bacon-and-sausages-subtitle'],
        alt: 'pizza-bekon-sausages'
      },
      {
        img: 'assets/images/landing/pizza-chicken-deluxe.webp',
        title: trl['Chicken-deluxe'],
        subtitle: trl['Chicken-deluxe-subtitle'],
        alt: 'pizza-chicken-deluxe'
      },
      {
        img: 'assets/images/landing/pizza-bbq-premium.webp',
        title: trl['Bbq-premium'],
        subtitle: trl['Bbq-premium-subtitle'],
        alt: 'pizza-bbq-premium'
      },
      {
        img: 'assets/images/landing/pizza-pepperoni-double.webp',
        title: trl['Pepperoni-double'],
        subtitle: trl['Pepperoni-double-subtitle'],
        alt: 'pizza-pepperoni-double'
      },
      {
        img: 'assets/images/landing/pizza-chicken-trio.webp',
        title: trl['Chicken-trio'],
        subtitle: trl['Chicken-trio-subtitle'],
        alt: 'pizza-chicken-trio'
      },
      {
        img: 'assets/images/landing/pizza-cheese.webp',
        title: trl['Cheese'],
        subtitle: trl['Cheese-subtitle'],
        alt: 'pizza-cheese'
      },
    ]
    return of(data).pipe(
      tap(() => this.skeleton.set(true)),
      delay(800),
      finalize(() => this.skeleton.set(false))
    );
  }

  scroll(pizza: HTMLElement) {
    pizza.scrollIntoView({
      behavior: 'smooth'
    })
  }

  sendForm() {
    if (!this.form.valid) return;
    const loadingId = new Date().valueOf().toString();

    this.globalLoadingService.show(loadingId);

    const form = this.form.value;

    setTimeout(() => {
      this.globalLoadingService.hide(loadingId);
      this.form.reset()
      this.showDialogWithCustomButton();
    }, 1000)

  }

  protected showDialogWithCustomButton(): void {
    this.dialogs
      .open('Заказ будет готов в течение 30 минут.', {
        label: 'Спасибо за заказ!',
        size: 'm',
        data: {button: 'Хорошо'},
        closeable: false
      })
      .subscribe();
  }
}
