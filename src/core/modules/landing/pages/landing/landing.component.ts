import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';
import {Skeleton} from '@ui-kit/src/lib/skeleton/skeleton';
import {Loading} from '@ui-kit/src/lib/loading/loading';
import {GlobalLoadingService} from '@ui-kit/src/lib/global-loading/global-loading.service';
import {Button} from '@ui-kit/src/lib/button/button';
import {Input} from '@ui-kit/src/lib/input/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [
    TranslocoDirective,
    Skeleton,
    Loading,
    Button,
    Input,
    FormsModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LandingComponent {
  value = signal('adasd')
  constructor(private globalLoadingService: GlobalLoadingService) {
    // this.globalLoadingService.show('1');
    //
    // setTimeout(() => {
    //   this.globalLoadingService.hide('1');
    // }, 2000)
  }
}
