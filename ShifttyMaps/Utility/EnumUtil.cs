using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShifttyMaps.Utility
{
    public class EnumUtil
    {
        public enum ActiveStatus
        {
            Active = 1,
            InActive = 2,
            Deleted = 3
        }

        public enum UserTypes
        {
            SuperAdmin = 1,
            Admin = 2,
            User = 3
        }

        public enum ActiveTabs
        {
            Dashboard = 1,
            Users = 2
        }

    }
}