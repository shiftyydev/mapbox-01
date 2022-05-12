using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ShifttyMaps.Models
{
    [Table("vehicles", Schema = "public")]
    public class Vehicles
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string vehicle_id { get; set; }
        public string api_key { get; set; }
    }
}