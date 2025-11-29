import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';
import {Skeleton} from '@ui-kit/src/lib/skeleton/skeleton';
import {Loading} from '@ui-kit/src/lib/loading/loading';
import {GlobalLoadingService} from '@ui-kit/src/lib/global-loading/global-loading.service';
import {Button} from '@ui-kit/src/lib/button/button';

@Component({
  selector: 'app-landing',
  imports: [
    TranslocoDirective,
    Skeleton,
    Loading,
    Button,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LandingComponent {
  constructor(private globalLoadingService: GlobalLoadingService) {
    // this.globalLoadingService.show('1');
    //
    // setTimeout(() => {
    //   this.globalLoadingService.hide('1');
    // }, 2000)
  }
}
