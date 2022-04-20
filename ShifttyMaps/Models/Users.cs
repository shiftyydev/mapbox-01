using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ShifttyMaps.Models
{
    [Table("users", Schema = "public")]
    public class Users
    {
        [Key]
        public int userid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public int roleid { get; set; }
        public DateTime createddate { get; set; }
        public int createdby { get; set; }
        public DateTime updateddate { get; set; }
        public int updatedby { get; set; }
        public int activestatus { get; set; }
        public string password { get; set; }
        public string oldPassword { get; set; }
        public string repassword { get; set; }
    }
}