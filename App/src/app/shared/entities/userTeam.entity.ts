import { TeamEntity } from '../../team/entities/team.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BaseEntity } from './base.entity';

export interface UserTeamEntity extends BaseEntity {
  userId: number;
  user?: UserEntity;
  teamId: number;
  team?: TeamEntity;
}
