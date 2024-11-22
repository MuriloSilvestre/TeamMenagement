import { MessageEntity } from '../../chat/entities/message.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { UserChatEntity } from '../../shared/entities/userChat.entity';
import { UserTeamEntity } from '../../shared/entities/userTeam.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { BaseEntity } from './../../shared/entities/base.entity';

export interface UserEntity extends BaseEntity {
  name: string;
  email: string;
  roleId: number;
  password: string;
  role?: RoleEntity;
  tasks?: TaskEntity[];
  userChats?: UserChatEntity[];
  userTeams?: UserTeamEntity[];
  messages?: MessageEntity[];
  color: string;
}
