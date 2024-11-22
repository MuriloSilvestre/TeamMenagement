import { ChatEntity } from '../../chat/entities/chat.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from './base.entity';

export interface UserChatEntity extends BaseEntity {
  userId: number;
  user?: UserEntity;
  chatId: number;
  chat?: ChatEntity;
}
