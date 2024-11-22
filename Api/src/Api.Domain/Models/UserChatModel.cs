namespace Domain.Models
{
    public class UserChatModel : BaseModel
    {
        private int _userId;
        public int UserId
        {
            get { return _userId; }
            set { _userId = value; }
        }

        private int _chatId;
        public int ChatId
        {
            get { return _chatId; }
            set { _chatId = value; }
        }
    }
}
