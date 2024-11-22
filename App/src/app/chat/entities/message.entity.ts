import { BaseEntity } from '../../shared/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ChatEntity } from './chat.entity';

export interface MessageEntity extends BaseEntity {
  content: string;
  timestamp: Date;
  userId: number;
  user?: UserEntity;
  chatId: number;
  chat?: ChatEntity;
}
