import Message from "@/types/Message";

export default class Session {
  title: string;
  userId: string;
  time: Date;
  messages: [Message];

  constructor(userId) {
    this.userId = userId;
    this.time = new Date();
    this.messages = [];
    this.title = "New Game";
  }
}
