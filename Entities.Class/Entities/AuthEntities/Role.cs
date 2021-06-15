using System.Collections.Generic;
using Infrastructure.Data;

namespace Entities.Class.Entities.AuthEntities
{
    public class Role : Entity
    {
        public string Name { get; set; }

        public List<RolePermission> RolePermissions { get; set; }
    }
}