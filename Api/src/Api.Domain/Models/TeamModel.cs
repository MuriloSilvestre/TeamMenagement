using System;

namespace Domain.Models
{
    public class TeamModel : BaseModel
    {
        private string _name;
        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Titulo Não pode ficar vazio.");
                _name = value;
            }
        }

        private string _description;
        public string Description
        {
            get { return _description; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Descrição Não pode ficar vazio.");
                _description = value;
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
