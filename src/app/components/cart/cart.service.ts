// cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../../components/product/product.model';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  addToCart(product: Product) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.itemsSubject.next(this.items);
  }

  removeItem(product: Product) {
    this.items = this.items.filter((item) => item.product.id !== product.id);
    this.itemsSubject.next(this.items);
  }

  updateItemQuantity(product: Product, newQuantity: number) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity = newQuantity;
      if (this.items[existingItemIndex].quantity <= 0) {
        this.items.splice(existingItemIndex, 1);
      }
      this.itemsSubject.next(this.items);
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  get items$() {
    return this.itemsSubject.asObservable();
  }

  getTotalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );
  }
}
