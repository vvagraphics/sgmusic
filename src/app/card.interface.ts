// card.interface.ts
export interface Card {
  dealTitle?: string;
  title: string;
  date?: Date;
  imageSrc: string;
  altText: string;
  description: string;
  showMore?: boolean;
}
