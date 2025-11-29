import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';
import {UiKit} from '@ui-kit/src/lib/ui-kit';

@Component({
  selector: 'app-landing',
  imports: [
    TranslocoDirective,
    UiKit
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LandingComponent {

}
