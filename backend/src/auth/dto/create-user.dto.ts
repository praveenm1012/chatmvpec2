import { IsString, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Plain text password' })
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'User email address' })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Plain text password' })
  @IsString()
  password?: string;
}
