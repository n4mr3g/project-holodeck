import { User } from "./user.model";

import { getModelForClass } from "@typegoose/typegoose";

export const TodoModel = getModelForClass(User);
// add other models here
