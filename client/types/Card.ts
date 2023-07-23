export default class Card {
  title: string;
  description: string;
  image: string;
  link: string;

  constructor(title: string, description: string, image: string, link: string) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.link = link;
  }
}
