using Infrastructure.Data;
using Infrastructure.Data.Enums;

namespace Entities.Class.Entities.AuthEntities
{
    public class RolePermission : Entity
    {
        public Role Role { get; set; }

        public int RoleId { get; set; }

        public PermissionType PermissionType { get; set; }
    }
}