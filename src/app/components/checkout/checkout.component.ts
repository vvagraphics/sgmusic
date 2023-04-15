import { Component } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  customer = {
    name: '',
    email: '',
    address: ''
  };
orderPlaced = false;
  constructor(public cartService: CartService) {} // Make the cartService public here

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  onSubmit() {
    console.log('Form submitted:', this.customer);
    this.orderPlaced = true;
  }
}
