using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Data;

namespace Map.API.Model
{
    public class Route : Entity
    {
        public string Name { get; set; }
        
        [Column(TypeName = "jsonb")]
        public List<MapPoint> Points { get; set; }
    }
}