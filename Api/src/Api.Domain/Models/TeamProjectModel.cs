namespace Domain.Models
{
    public class TeamProjectModel : BaseModel
    {
        private int _teamId;
        public int TeamId
        {
            get { return _teamId; }
            set { _teamId = value; }
        }

        private int _projectId;
        public int ProjectId
        {
            get { return _projectId; }
            set { _projectId = value; }
        }
    }
}
