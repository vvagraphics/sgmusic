import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface Card {
  title: string;
  date?: Date;
  imageSrc: string;
  altText: string;
  description: string;
  showMore?: boolean;
  category: string;
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit   {
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
  

  constructor(
    private route: ActivatedRoute,private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

ngOnInit() {

  this.route.fragment.subscribe((fragment: string | null) => {
    if (fragment) {
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
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
      destination: card.destination || '', // Add a default value for destination
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


navigateTo(destination: string): void {
  this.router.navigate([destination]);
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

navigateToProductCategory(category: string): void {
  this.router.navigate(['/products'], { queryParams: { category } });
}

//images for each section
section1Cards = [
  {
    title: 'Limited Items',
    imageSrc: 'assets/image/store/Limited Items.png',
    altText: 'Limited Items',
    description: `This section features exclusive merchandise, limited edition vinyl records, and time-sensitive offers that are only available for a limited time. Act quickly to take advantage of these opportunities and don't miss out!`,
    category: 'limited',
  },
  {
    title: 'Merchandise',
    imageSrc: 'assets/image/store/Merchandise.jpg',
    altText: 'Merchandise',
    description: 'Merchandise specific to a particular tour, such as t-shirts, posters, and other items featuring tour dates and the tour logo.home decor items with music-themed designs, such as wall art and throw pillows.',
    category: 'merch',
  },
  {
    title: 'Instruments and Equipment',
    imageSrc: 'assets/image/store/Instruments and Equipment.png',
    altText: 'Instruments and Equipment',
    description: 'Musical instruments and equipment, such as guitars, drum sets, and DJ equipment.',
    category: 'instruments',
  },
  {
    title: 'Books and Tutorials',
    imageSrc: 'assets/image/store/Books and Tutorials.jpg',
    altText: 'Books and Tutorials',
    description: 'Books and tutorials on how to play various musical instruments, as well as music theory and composition.',
    category: 'lessons',
  },
];



section2Cards = [
  {
    title: 'Up-and-coming Artists',
    destination: '/artist',
    imageSrc: 'assets/image/store/Up-and-coming Artists.png',
    altText: 'Up-and-coming Artists',
    description: 'This section features upcoming and independent artists who are making a name for themselves in the music industry. Learn about their background, music style, and latest releases, and be the first to discover the next big thing in music.',
    category: 'lessUp-and-coming Artistsns',
  },
  {
    title: 'Blog and Podcast',
    destination: '/blog-and-podcast',
    imageSrc: 'assets/image/store/Blog and Podcast.png',
    altText: 'Blog and Podcast',
    description: 'This section includes a blog and podcast that cover the latest developments in the music industry, including album releases, concerts, and artist interviews. Stay informed and entertained with in-depth discussions and expert analysis of the world of music.',
    category: 'lessons',
  },
  {
    title: 'Music Event/Concert Promotion',
    destination: '/music-events',
    imageSrc: 'assets/image/store/Music Event Concert Promotion.png',
    altText: 'Music Event/Concert Promotion',
    description: `This section provides information about upcoming music events and concerts, including lineup announcements, schedules, and ticket information. Get ready to experience the thrill of live music and connect with other fans.`,
    category: 'lessons',
  },
  {
    title: 'Promote Your Lessons',
    destination: '/promote-your-lessons',
    imageSrc: 'assets/image/store/Promote Your Lessons.png',
    altText: 'Promote Your Lessons',
    description: `This section is for music teachers and educators to promote their lessons and resources. Share your expertise with the world and help others learn about music.`,
    category: 'lessons',
  },
  {
    title: 'Promote Your Products',
    destination: 'promote',
    imageSrc: 'assets/image/store/Promote Your Products.png',
    altText: 'Promote Your Products',
    description: 'This section is for musicians and artists to promote their music-inspired products, such as albums, merchandise, and collectibles. Share your creativity with the world and connect with fans who appreciate your work.COMMING SOON!!',
    category: 'lessons',
  },
  {
    title: 'Other',
    destination: 'Other',
    imageSrc: 'assets/image/store/Other.png',
    altText: 'Other',
    description: 'This section includes other resources related to music, such as music theory and composition, music history, and community forums. Explore the world of music and connect with other fans and musicians.COMMING SOON!!',
    category: 'lessons',
  },
];


  section3Cards: Card[] = [
    {
      title: 'Loot Boxes',
      date: new Date('2023-01-01'),
      imageSrc: 'assets/image/store/Loot Boxes.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      category: 'lessons',
      showMore: false,
      
    },
      {
      title: 'Music Magazine',
      date: new Date('2023-01-02'),
      imageSrc: 'assets/image/store/Music Magazine.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      category: 'lessons',
      showMore: false,
      
    },
      {
      title: 'Music Lesson',
      date: new Date('2023-01-03'),
      imageSrc: 'assets/image/store/Music Lesson.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      category: 'lessons',
      showMore: false,
      
    },
      {
      title: 'Music Event Subscriber Savings',
      date: new Date('2023-02-01'),
      imageSrc: 'assets/image/store/Music Event Subscriber Savings.png',
      altText: 'Section 3 Image 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet, est sodales fringilla pretium, purus sem faucibus mauris, ut interdum erat dolor ac diam. Fusce eu lectus felis. Curabitur blandit, sapien sit amet gravida mattis, orci nisi gravida mi, et consequat velit magna sed enim. In hac habitasse platea dictumst. Ut eget mattis felis. Vestibulum ac faucibus nisi. In nec dictum urna.',
      category: 'lessons',
      showMore: false,
      
    },
    
  ];


}