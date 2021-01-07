using System;
using Infrastructure.Data;

namespace Auth.Data
{
    public class RefreshToken : Entity
    {
        public User User { get; set; }

        public int UserId { get; set; }

        public Guid Refresh { get; set; }
    }
}