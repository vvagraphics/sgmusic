// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from './cart.service';
import { Product } from '../../components/product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  updateItemQuantity(product: Product, newQuantity: number) {
    if (newQuantity > 0) {
      this.cartService.updateItemQuantity(product, newQuantity);
    } else {
      this.cartService.removeItem(product);
    }
  }

  removeItem(product: Product) {
    this.cartService.removeItem(product);
  }
}
