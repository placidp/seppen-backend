import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 22, { message: 'Имя должно быть не менее трех символов' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 22, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
