import {ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'lib-loading',
  imports: [
    NgStyle,
  ],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loading {
  color = input('primary'); // Цвет спиннера
  strokeWidth = input(6); // Толщина линии
  size = input(50); // Диаметр спиннера
  radius = computed(() => (this.size() - this.strokeWidth()) / 2)
  animationDuration = input(1.5); // Скорость анимации (в секундах)
  progress = input(0); // Прогресс (0-100) для "determinate"


}
