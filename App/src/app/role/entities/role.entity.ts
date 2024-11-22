import { BaseEntity } from '../../shared/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

export interface RoleEntity extends BaseEntity {
  name: string;
  user?: UserEntity;
}
