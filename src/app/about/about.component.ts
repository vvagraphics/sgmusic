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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit   {
  menuOpen = false;
  title = 'SGMUSIC';
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  selectedCardIndex = 0;
  buttonText = ['About', 'Biography', 'Contacts'];
  isXsScreen: boolean = false;
  isSmScreen: boolean = false;
  isMdScreen: boolean = false;
  isDesktopScreen: boolean = false;
  descriptionLength: number = 100;

    selectCard(index: number): void {
    this.selectedCardIndex = index;
    this.updateButtonText(index);
  }

  updateButtonText(index: number): void {
    const temp = this.buttonText[index];
    this.buttonText[index] = this.buttonText[0];
    this.buttonText[0] = temp;
  }


  
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
    imageSrc: 'assets/image/about/About.png',
    altText: 'About Image',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.'
  },
  {
    title: 'Biography',
    imageSrc: 'assets/image/about/product.png',
    altText: 'Product Image',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.'
  },
  {
    title: 'Contact',
    imageSrc: 'assets/image/about/shop.png',
    altText: 'Contact Information',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.'
  },
];

}
