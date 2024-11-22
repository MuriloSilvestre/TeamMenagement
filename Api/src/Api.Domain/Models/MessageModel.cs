using System;

namespace Domain.Models
{
    public class MessageModel : BaseModel
    {
        private string _content;
        public string Content
        {
            get { return _content; }
            set { _content = value; }
        }

        private DateTime _timestamp;
        public DateTime Timestamp
        {
            get { return _timestamp; }
            set {
                _timestamp = value == null ? DateTime.UtcNow : value;
            }
        }

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
