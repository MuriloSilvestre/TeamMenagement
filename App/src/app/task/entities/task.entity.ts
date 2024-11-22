import { ProjectEntity } from '../../project/entities/project.entity';
import { BaseEntity } from '../../shared/entities/base.entity';
import { StatusEntity } from '../../status/entities/status.entity';
import { UserEntity } from '../../user/entities/user.entity';

export interface TaskEntity extends BaseEntity {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: Date;
  statusId: number;
  status?: StatusEntity;
  assignedToUserId: number;
  user?: UserEntity;
  projectId: number;
  project?: ProjectEntity;
  color: string;
}
