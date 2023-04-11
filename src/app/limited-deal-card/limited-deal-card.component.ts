import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';



interface Card {
  dealTitle?: string;
  title: string;
  date?: Date;
  imageSrc: string;
  altText: string;
  description: string;
  showMore?: boolean;
}

@Component({
  selector: 'app-limited-deal-card',
  templateUrl: './limited-deal-card.component.html',
  styleUrls: ['./limited-deal-card.component.css']
})
export class LimitedDealCardComponent {
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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef) { }



ngOnInit() {
  const storedEndTime = parseInt(localStorage.getItem('limitedDealEndTime') ?? '0', 10);
    const now = new Date().getTime();

    if (storedEndTime && (now < storedEndTime)) {
      this.countdown = storedEndTime - now;
      this.limitedDealIndex = parseInt(localStorage.getItem('limitedDealIndex') ?? '0', 10);
      this.section2Cards[0].imageSrc = this.limitedDeals[this.limitedDealIndex].imageSrc;
    } else {
      this.limitedDealIndex = 0;
      this.countdown = 2 * 60 * 1000;
      this.storeEndTime();
    }

    this.section2Cards[0].description = this.formatCountdown(this.countdown);
    this.timer = setInterval(() => {
      this.updateCountdown();
      this.ref.markForCheck();
    }, 1000);

  
    

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
    description: 'Learn more about SGENTMUSIC LLC'
  },
  {
    title: 'Music',
    destination: 'music',
    imageSrc: 'assets/image/music.png',
    altText: 'Music Image',
    description: 'Discover new music and upcoming artists.'
  },
  {
    title: 'Store',
    destination: 'store',
    imageSrc: 'assets/image/store.png',
    altText: 'Store Image',
    description: 'Merchandise, Promote and Subscriptions.'
  },
  {
    title: 'News',
    destination: 'news',
    imageSrc: 'assets/image/news.png',
    altText: 'News Image',
    description: 'Stay up to date with the latest news.'
  },
];

// <!-- //REROUTING TO SHOP WITH FRAGMENT SCROLL TO ID BREAKS WHEN ONE LINK IS OFF/MISPELLED -->
// KEEP TITLES TO MINIMUM CHARACTERS FOR MOBILE
section2Cards = [
  {
    dealTitle:`Limited Deals!!`,
    title: 'Limited Deal',
    destination: 'merch',
    imageSrc: 'assets/image/Concert Tickets.png',
    altText: 'Concert Tickets',
    description: '',
    isLimitedDeal: true

  },
  {
    dealTitle:`Trending`,
    title: 'Trending',
    destination: 'promote',
    imageSrc: 'assets/image/Trending.jpg',
    altText: 'Trending',
    description: `See what's popular and trending in the world of music.`,
    isLimitedDeal: false
  },
  {
    dealTitle:`Subscribe and Save`,
    title: 'Sub and Save',
    destination: 'subscriptions',
    imageSrc: 'assets/image/Music Lessons.png',
    altText: 'Music Lessons',
    description: 'Subscribe to get exclusive access to lootboxes, lessons, and more.',
    isLimitedDeal: false
  },
];

  section3Cards: Card[] = [
    
  ];

// <!-- //REROUTING TO SHOP WITH FRAGMENT SCROLL TO ID BREAKS WHEN ONE LINK IS OFF/MISPELLED -->
  limitedDeals = [
  {
    dealTitle:`Limited Deals!!`,
    title: 'Limited Deal',
    destination: 'promote',
    imageSrc: `assets/image/limiteddeals/Music Lessons.png`,
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  },
  {
    dealTitle:`Limited Deals!!`,
    title: 'Limited Deal',
    destination: 'subscriptions',
    imageSrc: 'assets/image/limiteddeals/Lootbox Subscriptions.png',
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  },
  { dealTitle:`Limited Deals!!`,
    title: 'Limited Deal',
    destination: 'promote',
    imageSrc: 'assets/image/limiteddeals/Promote Yourself.png',
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  },
  { dealTitle:`Limited Deals!!`,
    title: 'Limited Deal',
    destination: 'subscriptions',
    imageSrc: 'assets/image/limiteddeals/Limited Amount Concert Tickets.png',
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  },
  { dealTitle:`Limited Deals!!`,
    title: 'Limited Deal',
    destination: 'merch',
    imageSrc: 'assets/image/limiteddeals/Home Decor.jpg',
    altText: 'Section 2 Image 1',
    description: 'TIME LEFT 20:19:23s'
  },
];


limitedDealIndex = 0;


updateCountdown() {
 if (this.resetTimer > 0) {
    this.resetTimer -= 1000;
    if (this.resetTimer === 0) {
      this.limitedDealIndex = (this.limitedDealIndex + 1) % this.limitedDeals.length;
      this.section2Cards[0].imageSrc = this.limitedDeals[this.limitedDealIndex].imageSrc;
      this.countdown = 2 * 60 * 1000;
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

