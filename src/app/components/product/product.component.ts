import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
// import { CategoryTitles } from './category-titles.interface';
import { Product } from './product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';



interface CategoryTitles {
  [key: string]: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  categories = [
    { title: 'Instruments', id: 'instruments' },
    { title: 'Equipment', id: 'equipment' },
    { title: 'Merchandise', id: 'merch' },
    { title: 'Lessons', id: 'lessons' },
  ];


  
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
    imageUrl: 'assets/image/products/2.png',
    category: 'instruments'
  },
  {
    id: 3,
    name: 'Concert Ticket - Band A',
    description: 'A ticket for an upcoming Band A concert',
    price: 120,
    imageUrl: 'assets/image/products/3.png',
    category: 'tickets'
  },
  {
    id: 4,
    name: 'Concert Ticket - Band B',
    description: 'A ticket for an upcoming Band B concert',
    price: 95,
    imageUrl: 'assets/image/products/9.png',
    category: 'tickets'
  },
  {
    id: 5,
    name: 'Band A T-Shirt',
    description: 'An official Band A T-shirt',
    price: 25,
    imageUrl: 'assets/image/products/8.png',
    category: 'merch'
  },
  {
    id: 6,
    name: 'Band B Hoodie',
    description: 'An official Band B hoodie',
    price: 50,
    imageUrl: 'assets/image/products/4.png',
    category: 'merch'
  },
  {
    id: 7,
    name: 'Music Lessons Subscription',
    description: 'A monthly subscription for online music lessons',
    price: 60,
    imageUrl: 'assets/image/products/10.png',
    category: 'subscriptions'
  },
  {
    id: 8,
    name: 'Live Concert Streaming Subscription',
    description: 'A monthly subscription to stream live concerts',
    price: 30,
    imageUrl: 'assets/image/products/7.png',
    category: 'subscriptions'
  },
  {
    id: 9,
    name: 'Guitar Strings',
    description: 'A set of high-quality guitar strings',
    price: 15,
    imageUrl: 'assets/image/products/11.png',
    category: 'equipment'
  },
  {
    id: 10,
    name: 'Guitar Lessons for Beginners',
    description: 'An online course for learning how to play the guitar',
    price: 40,
    imageUrl: 'assets/image/products/12.png',
    category: 'lessons'
  },
  {
    id: 11,
    name: 'Band A T-Shirt',
    description: 'An official Band A T-shirt',
    price: 25,
    imageUrl: 'assets/image/products/8.png',
    category: 'merch'
  },
  {
    id: 12,
    name: 'Band B Hoodie',
    description: 'An official Band B hoodie',
    price: 50,
    imageUrl: 'assets/image/products/4.png',
    category: 'merch'
  },
  
];


  constructor(private route: ActivatedRoute, private cartService: CartService, private snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
  const category = params['category'];
  if (category) {
    this.products = this.products.filter((product) => product.category === category);
  }
});

    
  }


addToCart(product: Product) {
  this.cartService.addToCart(product);
  this.snackBar.open('Product added to cart!', 'Close', {
    duration: 3000,
  });
}

getCategoryTitle(category: string): string {
  const categoryTitles: CategoryTitles = {
    limited: 'Limited Items',
    merch: 'Merchandise',
    instruments: 'Instruments',
    equipment: 'Equipment',
    lessons: 'Books/Tutorials/Lessons',
  };

  return categoryTitles[category];
}

scrollSection(category: string, direction: string): void {
    const section = document.getElementById(category);
    const scrollAmount = 300;

    if (!section) {
      return;
    }

    if (direction === 'left') {
      section.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }


}
