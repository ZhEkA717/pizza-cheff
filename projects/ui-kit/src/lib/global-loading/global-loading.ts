import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';
import {Loading} from '@ui-kit/src/lib/loading/loading';

@Component({
  selector: 'lib-global-loading',
  imports: [
    NgStyle,
    Loading
  ],
  templateUrl: './global-loading.html',
  styleUrl: './global-loading.scss',
  standalone: true
})
export class GlobalLoading {
  position: 'absolute' | 'fixed' = 'fixed';
}
