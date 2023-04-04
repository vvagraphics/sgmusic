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
    description: `I am Sean Gordon, a music producer and DJ with a passion for creating and producing music that speaks to the human experience. Born and raised in Spanish Town, Jamaica, I bring a unique blend of Jamaican roots and American influences to my work. With a focus on quality and authenticity, I have made a name for myself in the music industry. As a music producer, I have worked with some of the most talented artists in the industry, helping them to bring their visions to life. As a DJ, I am known for my electrifying live performances and ability to get audiences moving. With Sean Gordon Entertainment Music, I am dedicated to promoting and supporting the best in new and emerging talent. Join me on this journey, and let's celebrate the power of music together.
`
  },
  {
    title: 'Biography',
    imageSrc: 'assets/image/about/bio.png',
    altText: 'Product Image',
    description: `Sean Gordon was born and raised in Spanish Town, Jamaica, where he was surrounded by the sounds of reggae, ska, and roots music. This early exposure to music sparked a passion in Sean for creating and producing music of his own. Despite facing many challenges and obstacles, Sean never lost sight of his dreams and, determined to make a name for himself in the music industry, he moved to America.

With a focus on quality and authenticity, Sean honed his skills as a music producer, working tirelessly to create and produce music that spoke to the human experience. His unique blend of Jamaican roots and American influences quickly gained recognition, and Sean became known for his ability to bring artists' visions to life.

In addition to his work as a music producer, Sean is also a talented DJ, known for his electrifying live performances and ability to get audiences moving. With Sean Gordon Entertainment Music, Sean is dedicated to promoting and supporting the best in new and emerging talent. Join Sean on this journey, and be a part of the next chapter in the celebration of the power of music.`
  },
  {
    title: 'Contact',
    imageSrc: 'assets/image/about/contact.png',
    altText: 'Contact Information',
    description: `Do you have any questions or comments for me? I would love to hear from you! Please fill out the form below and I will get back to you as soon as possible.

[Name]
[Email]
[Subject]
[Message]

[Submit]
`
  },
];

}
