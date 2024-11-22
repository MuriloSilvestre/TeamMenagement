import { BaseEntity } from '../../shared/entities/base.entity';
import { UserChatEntity } from '../../shared/entities/userChat.entity';
import { MessageEntity } from './message.entity';

export interface ChatEntity extends BaseEntity {
  name: string;
  color: string;
  messages?: MessageEntity[];
  userChats?: UserChatEntity[];
}
