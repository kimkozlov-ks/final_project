using Infrastructure.Data;

namespace Auth.Data
{
    public class User : Entity
    {
        public int RoleId { get; set; }

        public Role Role { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public RefreshToken RefreshToken { get; set; }
    }
}