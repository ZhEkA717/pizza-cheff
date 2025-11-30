import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[forbidDot]',
  standalone: true
})
export class ForbidDotDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key === '.') {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    const paste = e.clipboardData?.getData('text') ?? '';
    if (paste.includes('.')) {
      e.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    const data = e.dataTransfer?.getData('text') ?? '';
    if (data.includes('.')) {
      e.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(e: any) {
    // На всякий случай чистим точку, если что-то просочилось
    e.target.value = e.target.value.replace(/\./g, '');
  }
}
