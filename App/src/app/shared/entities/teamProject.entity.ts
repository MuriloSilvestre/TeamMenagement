import { ProjectEntity } from '../../project/entities/project.entity';
import { TeamEntity } from '../../team/entities/team.entity';
import { BaseEntity } from './base.entity';

export interface TeamProjectEntity extends BaseEntity {
  teamId: number;
  team?: TeamEntity;
  projectId: number;
  project?: ProjectEntity;
}
