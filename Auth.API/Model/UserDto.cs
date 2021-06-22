using System.ComponentModel.DataAnnotations;

namespace Auth.API.Model
{
    public class UserDto
    {
        public int Id { get; set; }
        
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}