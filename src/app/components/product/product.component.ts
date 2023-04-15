import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

import { Product } from './product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

   products: Product[] = [
  {
    id: 1,
    name: 'Guitar',
    description: 'A high-quality acoustic guitar',
    price: 350,
    imageUrl: 'assets/image/products/1.png',
    category: 'instruments'
  },
  {
    id: 2,
    name: 'Piano',
    description: 'A versatile digital piano',
    price: 850,
    imageUrl: 'assets/image/products/1.png',
    category: 'instruments'
  },
  {
    id: 3,
    name: 'Concert Ticket - Band A',
    description: 'A ticket for an upcoming Band A concert',
    price: 120,
    imageUrl: 'assets/image/products/1.png',
    category: 'tickets'
  },
  {
    id: 4,
    name: 'Concert Ticket - Band B',
    description: 'A ticket for an upcoming Band B concert',
    price: 95,
    imageUrl: 'assets/image/products/1.png',
    category: 'tickets'
  },
  {
    id: 5,
    name: 'Band A T-Shirt',
    description: 'An official Band A T-shirt',
    price: 25,
    imageUrl: 'assets/image/products/1.png',
    category: 'merch'
  },
  {
    id: 6,
    name: 'Band B Hoodie',
    description: 'An official Band B hoodie',
    price: 50,
    imageUrl: 'assets/image/products/1.png',
    category: 'merch'
  },
  {
    id: 7,
    name: 'Music Lessons Subscription',
    description: 'A monthly subscription for online music lessons',
    price: 60,
    imageUrl: 'assets/image/products/1.png',
    category: 'subscriptions'
  },
  {
    id: 8,
    name: 'Live Concert Streaming Subscription',
    description: 'A monthly subscription to stream live concerts',
    price: 30,
    imageUrl: 'assets/image/products/1.png',
    category: 'subscriptions'
  }
];


  constructor(private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }


addToCart(product: Product) {
  this.cartService.addToCart(product);
  this.snackBar.open('Product added to cart!', 'Close', {
    duration: 3000,
  });
}
}
