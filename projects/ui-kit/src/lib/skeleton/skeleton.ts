import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'lib-skeleton',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skeleton {
  @Input() styleClass: string = '';
  @Input() style: {[klass: string]: any} | null | undefined;
  @Input() size: string | undefined;
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() borderRadius: string | undefined;
  @Input() shape: 'rectangle' | 'circle' = 'rectangle';
  @Input() animation: string = 'wave';

  containerClass() {
    return {
      'ui-kit-skeleton ui-kit-component': true,
      'ui-kit-skeleton-circle': this.shape === 'circle',
      'ui-kit-skeleton-none': this.animation === 'none'
    };
  }

  get containerStyle() {
    if(this.size) {
      return {
        ...this.style,
        width: this.size,
        height: this.size,
        borderRadius: this.borderRadius
      }
    }

    return {
      ...this.style,
      width: this.width,
      height: this.height,
      borderRadius: this.borderRadius
    }
  }
}
