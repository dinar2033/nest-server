import { IsDateString, IsString } from "class-validator";
import * as mongoose from "mongoose";

export class CreateUserTokenDto {
  @IsString()
  readonly token: string
  @IsString()
  readonly uId: mongoose.Types.ObjectId
  @IsDateString()
  readonly expireAt: string
}