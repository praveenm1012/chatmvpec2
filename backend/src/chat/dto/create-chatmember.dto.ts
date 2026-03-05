import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChatMemberDto {
  
  
  @ApiProperty({ description: '' })
  
  id: string;

  
  
  @ApiProperty({ description: '' })
  
  chatId: string;

  
  
  @ApiProperty({ description: '' })
  
  userId: string;

  
}

export class UpdateChatMemberDto {
  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  id?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  chatId?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  userId?: string;

  
}