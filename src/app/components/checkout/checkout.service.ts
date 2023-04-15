// checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  submitOrder(customer: any, cartItems: any[]) {
    // Replace with your API endpoint or payment gateway URL
    const apiUrl = 'https://your-api-endpoint.com/checkout';

    const order = {
      customer: customer,
      items: cartItems
    };

    return this.http.post(apiUrl, order);
  }
}
