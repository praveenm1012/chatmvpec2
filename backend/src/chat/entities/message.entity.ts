import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty({ description: 'ID of the chat this message belongs to' })
  chatId: string;

  @Column()
  @ApiProperty({ description: 'ID of the user who sent the message' })
  senderId: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Message content' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
