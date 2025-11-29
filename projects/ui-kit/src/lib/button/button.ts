import {ChangeDetectionStrategy, Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {
  label = input('button');
  size = input<'lg' | 'md'>('md')

  @Output() onClick = new EventEmitter<MouseEvent>();
}
