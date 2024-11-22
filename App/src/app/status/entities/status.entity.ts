import { TaskEntity } from '../../task/entities/task.entity';
import { BaseEntity } from '../../shared/entities/base.entity';
import { ProjectStatusEntity } from '../../shared/entities/projectStatus.entity';

export interface StatusEntity extends BaseEntity {
  name: string;
  color: string;
  task?: TaskEntity;
  projectStatus?: ProjectStatusEntity[];
}
