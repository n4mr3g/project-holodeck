export default class Message {
  content: string;
  userId: string;
  time: Date;
  isFromAi: boolean;
  author: string;

  constructor(
    content: string,
    author: string,
    userId: string,
    isFromAi: boolean = false,
  ) {
    this.content = content;
    this.userId = userId;
    this.author = author;
    this.time = new Date();
    this.isFromAi = isFromAi;
  }
}
