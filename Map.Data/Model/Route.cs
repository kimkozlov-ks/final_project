using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Map.API.Model
{
    public class Route
    {    
        [Key]
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        [Column(TypeName = "jsonb")]
        public List<MapPoint> Points { get; set; }
    }
}