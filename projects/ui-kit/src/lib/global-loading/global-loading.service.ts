import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  DOCUMENT,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector
} from '@angular/core';
import {GlobalLoading} from '@ui-kit/src/lib/global-loading/global-loading';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoadingService {
  private showStatus = false;
  private componentRef!: ComponentRef<GlobalLoading>;
  list: string[] = [];

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  show(id: string, selector?: string) {
    this.list.push(id);

    if (!this.showStatus) {
      this.showStatus = true;

      this.componentRef = createComponent(GlobalLoading, {
        environmentInjector: this.appRef.injector,
        elementInjector: this.injector,
      });

      this.appRef.attachView(this.componentRef.hostView);

      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      this.componentRef.instance.position = selector ? 'absolute' : 'fixed';

      (selector
          ? this.document.querySelector(selector)
          : this.document.body
      )?.appendChild(domElem);
    }
  }

  hide(id: string) {
    this.list = this.list.filter(item => item !== id);
    if (this.list.length === 0 && this.showStatus) {
      this.showStatus = false;
      this.destroyComponent();
    }
  }

  hideAll() {
    this.list = [];
    this.showStatus = false;
    this.destroyComponent();
  }

  private destroyComponent() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }
}
