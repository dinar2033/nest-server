import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {

  @Prop()
  login: string

  @Prop()
  password: string

  @Prop()
  surname: string

  @Prop()
  name: string

  @Prop()
  patronymic: string

  @Prop()
  position: string

  @Prop()
  rank: string

  @Prop()
  groupnumber: number

}

export const UserSchema = SchemaFactory.createForClass(User)