import Message from '@/types/Message';

export default class GameSession {
  id: string;
  title: string;
  userId: string;
  time: Date;
  messages: Message[];

  constructor(id: string, userId: string, title?: string) {
    this.id = id;
    this.userId = userId;
    this.time = new Date();
    this.messages = [];
    this.title = 'New Game';
  }

  setTitle(title: string) {
    this.title = title;
  }

  addMessages(messages: Message[]) {
    this.messages = this.messages.concat(messages);
  }
}
