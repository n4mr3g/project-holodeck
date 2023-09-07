import GameSession from '@/types/GameSession';
import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";


export class User {
  @prop({ default: () => nanoid(21) })
  _id: string;

  @prop({ default: [] })
  gameSessions: [GameSession];

  @prop({ default: () => new Date() })
  createdAt: Date;
}


// const User = model('User', UserSchema);
