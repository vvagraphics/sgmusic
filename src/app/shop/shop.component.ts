import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OnInit } from '@angular/core';

interface Card {
  title: string;
  date?: Date;
  imageSrc: string;
  altText: string;
  description: string;
  showMore?: boolean;
}
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit   {
  menuOpen = false;
  title = 'SGMUSIC';
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  isXsScreen: boolean = false;
  isSmScreen: boolean = false;
  isMdScreen: boolean = false;
  isDesktopScreen: boolean = false;
  descriptionLength: number = 100;

  constructor(private breakpointObserver: BreakpointObserver) { }

ngOnInit() {
  this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).subscribe(result => {
    this.isXsScreen = result.breakpoints[Breakpoints.XSmall];
    this.isSmScreen = result.breakpoints[Breakpoints.Small];
    this.isMdScreen = result.breakpoints[Breakpoints.Medium]; // Add this line to set isMdScreen
    this.isDesktopScreen = result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge];
    this.section1Cards = this.section1Cards.map((card) => ({
      ...card,
      title: this.getImageName(card.imageSrc),
    }));
    this.section2Cards = this.section2Cards.map((card) => ({
      ...card,
      title: this.getImageName(card.imageSrc),
    }));
    this.section3Cards = this.section3Cards.map((card) => ({
      ...card,
      title: this.getImageName(card.imageSrc),
    }));

  });
     if (this.isXsScreen) {
      this.descriptionLength = 300;
    } else if (this.isSmScreen) {
      this.descriptionLength = 410;
    } else if (this.isMdScreen) {
      this.descriptionLength = 510;
    } else {
      this.descriptionLength = 790;
    }
  
}
//functions
getRowHeight(): string {
  if (this.isXsScreen || this.isSmScreen) {
    return '1:1.35';
  } else if (this.isMdScreen) {
    return '1:1.35';
  } else if (this.isDesktopScreen) {
    return '1:1.6';
  } else {    
    return '1:2';
  }
}
getImageName(imageSrc: string): string {
  const fileName = imageSrc.split('/').pop();
  return (fileName?.split('.')[0] || '').toUpperCase();
}


// toggleShowMore(index: number): void {
//   this.section3Cards[index].showMore = !this.section3Cards[index].showMore;
// }


//images for each section
section1Cards = [
  {
    title: 'About',
    imageSrc: 'assets/image/about.png',
    altText: 'About Image',
    description: 'Description for About card in section 1'
  },
  {
    title: 'Product',
    imageSrc: 'assets/image/product.png',
    altText: 'Product Image',
    description: 'Description for Product card in section 1'
  },
  {
    title: 'Shop',
    imageSrc: 'assets/image/shop.png',
    altText: 'Shop Image',
    description: 'Description for Shop card in section 1'
  },
  {
    title: 'News',
    imageSrc: 'assets/image/news.png',
    altText: 'News Image',
    description: 'Description for News card in section 1'
  },
];


section2Cards = [
  {
    title: 'Shop',
    imageSrc: 'assets/image/merch.png',
    altText: 'Section 2 Image 1',
    description: 'Description for Image 1 card in section 2'
  },
  {
    title: 'Shop',
    imageSrc: 'assets/image/promote.png',
    altText: 'Section 2 Image 2',
    description: 'Description for Image 2 card in section 2'
  },
  {
    title: 'Shop',
    imageSrc: 'assets/image/lootbox.png',
    altText: 'Section 2 Image 3',
    description: 'Description for Image 3 card in section 2'
  },
];


  section3Cards: Card[] = [
    {
      title: 'Blog Post 1',
      date: new Date('2023-01-01'),
      imageSrc: 'assets/image/fujii.kaze.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      showMore: false,
    },
      {
      title: 'Blog Post 2',
      date: new Date('2023-01-02'),
      imageSrc: 'assets/image/edc.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      showMore: false,
    },
      {
      title: 'Blog Post 3',
      date: new Date('2023-01-03'),
      imageSrc: 'assets/image/keznami.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      showMore: false,
    },
      {
      title: 'Blog Post 4',
      date: new Date('2023-02-01'),
      imageSrc: 'assets/image/concert.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      showMore: false,
    },
    
  ];


}