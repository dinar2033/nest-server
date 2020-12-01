import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly login: string
  @ApiProperty()
  @IsString()
  readonly password: string
  @ApiProperty()
  @IsString()
  readonly role: string
  @ApiProperty()
  @IsString()
  readonly rank: string
  @ApiProperty()
  @IsString()
  readonly groupnumber: string
}