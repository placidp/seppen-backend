import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3, 22, { message: 'Имя должно быть не менее трех символов' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, {
    message: 'Такая почта уже существует',
  })
  email: string;

  @Length(6, 22, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
