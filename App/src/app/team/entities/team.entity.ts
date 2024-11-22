import { BaseEntity } from '../../shared/entities/base.entity';
import { TeamProjectEntity } from '../../shared/entities/teamProject.entity';
import { UserTeamEntity } from '../../shared/entities/userTeam.entity';

export interface TeamEntity extends BaseEntity {
  name: string;
  description: string;
  teamProjects?: TeamProjectEntity[];
  userTeams?: UserTeamEntity[];
  color: string;
}
