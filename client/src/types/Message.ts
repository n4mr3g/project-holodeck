export default class Message {
  content: string;
  userId: string;
  time: Date;
  isFromBot: boolean;
  author: string;

  constructor(content: string, author:string, userId: string, isFromBot: boolean = false) {
    this.content = content;
    this.userId = userId;
    this.author = author;
    this.time = new Date();
    this.isFromBot = isFromBot;
  }

}
