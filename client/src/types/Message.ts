export default class Message {
  content: string;
  author: string;
  time: Date;
  isFromBot: boolean;

  constructor(content: string, author: string, isFromBot: boolean = false) {
    this.content = content;
    this.author = author;
    this.time = new Date();
    this.isFromBot = isFromBot;
  }

}
