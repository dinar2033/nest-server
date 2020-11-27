export class CreateUserDto {
  readonly login: string
  readonly password: string
  readonly surname: string
  readonly name: string
  readonly patronymic: string
  readonly position: string
  readonly rank: string
  readonly groupnumber: number
}