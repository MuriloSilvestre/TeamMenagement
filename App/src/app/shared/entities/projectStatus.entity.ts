import { ProjectEntity } from '../../project/entities/project.entity';
import { StatusEntity } from '../../status/entities/status.entity';
import { BaseEntity } from './base.entity';

export interface ProjectStatusEntity extends BaseEntity {
  StatusId: number;
  status?: StatusEntity;
  ProjectId: number;
  project?: ProjectEntity;
}
