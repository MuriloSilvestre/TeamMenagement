using System;

namespace Domain.Models
{
    public class UserModel : BaseModel
    {
        private string _name;
        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Nome N�o pode ficar vazio.");
                _name = value;
            }
        }

        private string _email;
        public string Email
        {
            get { return _email; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("E-mail N�o pode ficar vazio.");
                _email = value;
            }
        }

        private int _roleId;
        public int RoleId
        {
            get { return _roleId; }
            set { _roleId = value; }
        }

        private string _password;
        public string Password
        {
            get { return _password; }
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentException("Senha N�o pode ficar vazio.");
                _password = value;
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
