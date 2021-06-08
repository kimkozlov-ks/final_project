using System.Collections.Generic;
using Infrastructure.Data;

namespace Auth.Data
{
    public class Role : Entity
    {
        public string Name { get; set; }

        public List<RolePermission> RolePermissions { get; set; }
    }
}