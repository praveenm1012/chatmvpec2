import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  
  
  @ApiProperty({ description: '' })
  
  id: string;

  
  
  @ApiProperty({ description: '' })
  
  chatId: string;

  
  
  @ApiProperty({ description: '' })
  
  senderId: string;

  
  
  @ApiProperty({ description: '' })
  
  content: string;

  
  
  @ApiProperty({ description: '' })
  
  createdAt: string;

  
}

export class UpdateMessageDto {
  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  id?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  chatId?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  senderId?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  content?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  createdAt?: string;

  
}