import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {Translation, TranslocoDirective, TranslocoService} from '@jsverse/transloco';
import {GlobalLoadingService} from '@ui-kit/src/lib/global-loading/global-loading.service';
import {Button} from '@ui-kit/src/lib/button/button';
import {FormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PizzaCard} from '@core/modules/landing/interfaces/landing.interfaces';
import {delay, finalize, of, switchMap, tap} from 'rxjs';
import {PizzaCardComponent} from '@core/modules/landing/components/pizza-card/pizza-card.component';
import {Skeleton} from '@ui-kit/src/lib/skeleton/skeleton';

@Component({
  selector: 'app-landing',
  imports: [
    TranslocoDirective,
    Button,
    FormsModule,
    PizzaCardComponent,
    Skeleton,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LandingComponent {
  value = signal('adasd');
  private translocoService = inject(TranslocoService);
  cards = signal<PizzaCard[] | null>(null);
  skeleton = signal(false);

  constructor() {
    this.translocoService.selectTranslation().pipe(
      takeUntilDestroyed(),
      switchMap((trl) => this.getCards(trl))
    ).subscribe(cards => {
      this.cards.set(cards);
    })
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
}
