import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl = 'http://localhost:3000';
  private cartItems: CartItem[] = [];

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addItemToCart(product: Product, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
    

    if (itemIndex >= 0) {
      // Update the quantity if the item is already in the cart
      this.cartItems[itemIndex].quantity += quantity;
    } else {
      // Add a new item to the cart if it's not already there
      const newItem: CartItem = {
        product,
        quantity,
      };
      this.cartItems.push(newItem);
    }
  }

  removeItemFromCart(item: CartItem): void {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.product.id === item.product.id);

    if (itemIndex >= 0) {
      this.cartItems.splice(itemIndex, 1);
    }
  }

  updateCartItem(item: CartItem): void {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.product.id === item.product.id);

    if (itemIndex >= 0) {
      this.cartItems[itemIndex].quantity = item.quantity;
    }
  }
}
