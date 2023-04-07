import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

//LIMITED DEAL COUNTDOWN TIMER
countdown: number = 2 * 60 * 1000;
countdownDisplay: string = '';
resetTimer: number = 0;

  timer: any;


   news: any[] = [];

  isXsScreen: boolean = false;
  isSmScreen: boolean = false;
  isMdScreen: boolean = false;
  isDesktopScreen: boolean = false;
  descriptionLength: number = 100;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute, private newsService: NewsService, private ref: ChangeDetectorRef) { }



ngOnInit() {
  const storedEndTime = parseInt(localStorage.getItem('limitedDealEndTime') ?? '0', 10);
    const now = new Date().getTime();

    if (storedEndTime && (now < storedEndTime)) {
      this.countdown = storedEndTime - now;
      this.limitedDealIndex = parseInt(localStorage.getItem('limitedDealIndex') ?? '0', 10);
      this.section2Cards[0].imageSrc = this.limitedDeals[this.limitedDealIndex].imageSrc;
    } else {
      this.limitedDealIndex = 0;
      this.countdown = 5 * 60 * 1000;
      this.storeEndTime();
    }

    this.section2Cards[0].description = this.formatCountdown(this.countdown);
    this.timer = setInterval(() => {
      this.updateCountdown();
      this.ref.markForCheck();
    }, 1000);

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
    this.isMdScreen = result.breakpoints[Breakpoints.Medium];
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
      this.router.navigate(['/music']);
      break;
    case 'Shop':
      this.router.navigate(['/store']);
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
storeEndTime() {
  const now = new Date().getTime();
  const endTime = now + this.countdown;
  localStorage.setItem('limitedDealEndTime', endTime.toString());
  localStorage.setItem('limitedDealIndex', this.limitedDealIndex.toString());
}

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
    title: 'Limited Deal',
    destination: 'merch',
    imageSrc: 'assets/image/Limited Deal.png',
    altText: 'Section 2 Image 1',
    description: '',
    isLimitedDeal: true

  },
  {
    title: 'Trending',
    destination: 'Trending',
    imageSrc: 'assets/image/Trending.jpg',
    altText: 'Section 2 Image 2',
    description: 'This is what is selling the most Today or this Week',
    isLimitedDeal: false
  },
  {
    title: 'Sub and Save',
    destination: 'subscriptions',
    imageSrc: 'assets/image/Save on Lesson Subscription.png',
    altText: 'Section 2 Image 3',
    description: '50% OFF MUSIC LESSONS MONTHLY SUBSCIBTIONS',
    isLimitedDeal: false
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


  limitedDeals = [
  {
    title: 'Limited Deal',
    destination: 'merch',
    imageSrc: 'assets/image/limiteddeals/Limited Deal 1.png',
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  },
  {
    title: 'Limited Deal',
    destination: 'merch',
    imageSrc: 'assets/image/limiteddeals/Limited Deal 2.png',
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  }
];


limitedDealIndex = 0;


updateCountdown() {
 if (this.resetTimer > 0) {
    this.resetTimer -= 1000;
    if (this.resetTimer === 0) {
      this.limitedDealIndex = (this.limitedDealIndex + 1) % this.limitedDeals.length;
      this.section2Cards[0].imageSrc = this.limitedDeals[this.limitedDealIndex].imageSrc;
      this.countdown = 4 * 60 * 1000;
      this.storeEndTime();
      this.section2Cards[0].description = this.formatCountdown(this.countdown);
    }
    return;
  }

  this.countdown -= 1000;

  if (this.countdown <= 0) {
    this.resetTimer = 1 * 60 * 1000;
    this.section2Cards[0].description = 'Limited deal ended';
  } else if (this.countdown <= 1 * 60 * 1000) {
    this.section2Cards[0].description = `LIMITED DEAL ENDS SOON!! - ${this.formatCountdown(this.countdown)}`;
  } else {
    this.section2Cards[0].description = this.formatCountdown(this.countdown);
  }
}


formatCountdown(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

  return `TIME LEFT ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}s`;
}


}

