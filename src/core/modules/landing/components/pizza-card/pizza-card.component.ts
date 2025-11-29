import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {PizzaCard} from '@core/modules/landing/interfaces/landing.interfaces';
import {Button} from '@ui-kit/src/lib/button/button';
import {TranslocoDirective} from '@jsverse/transloco';

@Component({
  selector: 'app-pizza-card',
  imports: [
    Button,
    TranslocoDirective
  ],
  templateUrl: './pizza-card.component.html',
  styleUrl: './pizza-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class PizzaCardComponent {
  card = input<PizzaCard>();
}
