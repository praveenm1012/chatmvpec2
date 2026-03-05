import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  
  
  @ApiProperty({ description: '' })
  
  id: string;

  
  
  @ApiProperty({ description: '' })
  
  email: string;

  
  
  @ApiProperty({ description: '' })
  
  passwordHash: string;

  
}

export class UpdateUserDto {
  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  id?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  email?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  passwordHash?: string;

  
}