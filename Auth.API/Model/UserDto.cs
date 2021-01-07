using System.ComponentModel.DataAnnotations;

namespace Auth.API.Model
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}