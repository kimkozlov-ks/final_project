using Auth.Data;
using Entities.Class.Entities.AuthEntities;
using Entities.Class.Entities.GarageEntities;
using Infrastructure.Data.Repository;

namespace Auth.API.Repositories
{
    public class UserRepository: AbstractRepository<User, AuthDbContext>
    {
        public UserRepository(AuthDbContext context) : base(context)
        {
        }
    }
}