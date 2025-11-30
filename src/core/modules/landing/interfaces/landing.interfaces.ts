import {FormControl, FormGroup} from '@angular/forms';

export interface PizzaCard {
  img: string;
  title: string;
  subtitle: string;
  alt: string;
}

export type PlaceOrderForm = FormGroup<{
  name: FormControl<string | null>,
  address: FormControl<string | null>,
  phone: FormControl<string | null>
}>
