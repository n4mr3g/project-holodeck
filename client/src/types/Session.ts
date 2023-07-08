import Message from "@/types/Message";

export default class Session {
  id: string;
  title: string;
  userId: string;
  time: Date;
  messages: Message[];

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
    this.time = new Date();
    this.messages = [];
    this.title = "New Game";
  }
}
