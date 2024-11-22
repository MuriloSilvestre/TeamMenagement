namespace Domain.Models
{
    public class UserTeamModel : BaseModel
    {
        private int _teamId;
        public int TeamId
        {
            get { return _teamId; }
            set { _teamId = value; }
        }

        private int _userId;
        public int UserId
        {
            get { return _userId; }
            set { _userId = value; }
        }
    }
}
