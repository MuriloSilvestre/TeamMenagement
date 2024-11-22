import { BaseEntity } from '../../shared/entities/base.entity';
import { ProjectStatusEntity } from '../../shared/entities/projectStatus.entity';
import { TeamProjectEntity } from '../../shared/entities/teamProject.entity';
import { TaskEntity } from '../../task/entities/task.entity';

export interface ProjectEntity extends BaseEntity {
  id?: number;
  title: string;
  description: string;
  color: string;
  isCompleted: boolean;
  startDate: Date;
  endDate: Date;
  actualStartDate: Date;
  actualEndDate: Date;
  budget: string;
  actualCost: string;
  priority: string;
  budgetDocument: string;
  tasks?: TaskEntity[];
  teamProjects?: TeamProjectEntity[];
  projectStatus?: ProjectStatusEntity[];
}
