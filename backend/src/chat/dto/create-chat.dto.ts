import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChatDto {
  
  
  @ApiProperty({ description: '' })
  
  id: string;

  
  
  @ApiProperty({ description: '' })
  
  type: string;

  
  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  
  name?: string;

  
}

export class UpdateChatDto {
  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  id?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  type?: string;

  
  @ApiPropertyOptional({ description: '' })
  @IsOptional()
  name?: string;

  
}