import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';



interface Card {
  title: string;
  date?: Date;
  imageSrc: string;
  altText: string;
  description: string;
  showMore?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NewsService]
})
export class HomeComponent implements OnInit   {
  menuOpen = false;
  title = 'SGMUSIC';
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  
   news: any[] = [];

  isXsScreen: boolean = false;
  isSmScreen: boolean = false;
  isMdScreen: boolean = false;
  isDesktopScreen: boolean = false;
  descriptionLength: number = 100;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute, private newsService: NewsService) { }



ngOnInit() {

  this.newsService.getNews().subscribe((data: any) => {
      this.news = data.articles;
    }, (error) => {
      console.error(error);
    });

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


navigateToComponent(card: Card) {
  switch (card.title) {
    case 'About':
      this.router.navigate(['/about']);
      break;
    case 'Product':
      this.router.navigate(['/product']);
      break;
    case 'Shop':
      this.router.navigate(['/shop']);
      break;
    case 'News':
      this.router.navigate(['/news']);
      break;
    default:
      console.error('No route found for', card.title);
  }
}

navigateTo(destination: string): void {
  this.router.navigate([destination], { relativeTo: this.route });
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
    destination: 'about',
    imageSrc: 'assets/image/about.png',
    altText: 'About Image',
    description: 'Description for About card in section 1'
  },
  {
    title: 'Music',
    destination: 'music',
    imageSrc: 'assets/image/music.png',
    altText: 'Music Image',
    description: 'Description for Product card in section 1'
  },
  {
    title: 'Store',
    destination: 'store',
    imageSrc: 'assets/image/store.png',
    altText: 'Store Image',
    description: 'Description for Shop card in section 1'
  },
  {
    title: 'News',
    destination: 'news',
    imageSrc: 'assets/image/news.png',
    altText: 'News Image',
    description: 'Description for News card in section 1'
  },
];


section2Cards = [
  {
    title: 'Merch',
    destination: 'merch',
    imageSrc: 'assets/image/merch.png',
    altText: 'Section 2 Image 1',
    description: 'Description for Image 1 card in section 2'
  },
  {
    title: 'Promote',
    destination: 'promote',
    imageSrc: 'assets/image/promote.png',
    altText: 'Section 2 Image 2',
    description: 'Description for Image 2 card in section 2'
  },
  {
    title: 'Subscriptions',
    destination: 'subscriptions',
    imageSrc: 'assets/image/Subscriptions.png',
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.',
      showMore: false,
    },
      {
      title: 'Blog Post 2',
      date: new Date('2023-01-02'),
      imageSrc: 'assets/image/edc.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.',
      showMore: false,
    },
      {
      title: 'Blog Post 3',
      date: new Date('2023-01-03'),
      imageSrc: 'assets/image/keznami.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.',
      showMore: false,
    },
      {
      title: 'Blog Post 4',
      date: new Date('2023-02-01'),
      imageSrc: 'assets/image/concert.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus convallis a justo eget luctus. Cras vitae purus ex. In eget pharetra mi, ac blandit lectus. Ut at lectus imperdiet, ultrices tortor vitae, sodales ex. Quisque quam nisl, faucibus a nunc ut, fringilla fermentum metus. Morbi pellentesque, odio ac laoreet condimentum, nisl lorem faucibus lectus, in lacinia magna libero sit amet lorem. Suspendisse aliquet laoreet lectus, non volutpat dui cursus ac. Duis nulla sem, viverra vitae risus vel, rutrum finibus dui.',
      showMore: false,
    },
    
  ];


}

