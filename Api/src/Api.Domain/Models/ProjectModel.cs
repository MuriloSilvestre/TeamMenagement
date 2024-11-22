using System;

namespace Domain.Models
{
    public class ProjectModel : BaseModel
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
            set { _description = string.IsNullOrEmpty(value) ? "Sem description" : value; }
        }

        private bool _isCompleted;
        public bool IsCompleted
        {
            get { return _isCompleted; }
            set { _isCompleted = value; }
        }

        private string _color;
        public string Color
        {
            get { return _color; }
            set { _color = value; }
        }

        private DateTime _startDate;
        public DateTime StartDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        }

        private DateTime _endDate;
        public DateTime EndDate
        {
            get { return _endDate; }
            set { _endDate = value; }
        }

        private DateTime _actualStartDate;
        public DateTime ActualStartDate
        {
            get { return _actualStartDate; }
            set { _actualStartDate = value; }
        }

        private DateTime _actualEndDate;
        public DateTime ActualEndDate
        {
            get { return _actualEndDate; }
            set { _actualEndDate = value; }
        }

        private string _budget;
        public string Budget
        {
            get { return _budget; }
            set { _budget = value; }
        }

        private string _actualCost;
        public string ActualCost
        {
            get { return _actualCost; }
            set { _actualCost = value; }
        }

        private string _priority;
        public string Priority
        {
            get { return _priority; }
            set { _priority = value; }
        }

        private string _budgetDocument;
        public string BudgetDocument
        {
            get { return _budgetDocument; }
            set { _budgetDocument = value; }
        }
    }
}
