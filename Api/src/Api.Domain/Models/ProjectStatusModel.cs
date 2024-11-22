namespace Domain.Models
{
    public class ProjectStatusModel : BaseModel
    {
        private int _statusId;
        public int StatusId
        {
            get { return _statusId; }
            set { _statusId = value; }
        }

        private int _projectId;
        public int ProjectId
        {
            get { return _projectId; }
            set { _projectId = value; }
        }
    }
}
