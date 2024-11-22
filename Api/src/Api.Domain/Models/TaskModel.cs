using System;

namespace Domain.Models
{
    public class TaskModel : BaseModel
    {
        private string _title;
        public string Title
        {
            get { return _title; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Titulo Não pode ficar vazio.");
                _title = value;
            }
        }

        private string _description;
        public string Description
        {
            get { return _description; }
            set
            {
                _description = string.IsNullOrEmpty(value) ? "Sem description" : value;
            }
        }

        private bool _isCompleted;
        public bool IsCompleted
        {
            get { return _isCompleted; }
            set
            {
                _isCompleted = value;
            }
        }

        private DateTime _dueDate;
        public DateTime DueDate
        {
            get { return _dueDate; }
            set
            {
                _dueDate = value;
            }
        }

        private int _statusId;
        public int StatusId
        {
            get { return _statusId; }
            set
            {
                _statusId = value;
            }
        }

        private int _assignedToUserId;
        public int AssignedToUserId
        {
            get { return _assignedToUserId; }
            set
            {
                _assignedToUserId = value;
            }
        }

        private int _projectId;
        public int ProjectId
        {
            get { return _projectId; }
            set
            {
                _projectId = value;
            }
        }

        private string _color;
        public string Color
        {
            get { return _color; }
            set { _color = value; }
        }
    }
}
