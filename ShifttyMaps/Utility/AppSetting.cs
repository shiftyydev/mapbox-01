using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace ShifttyMaps.Utility
{
    public class AppSetting
    {
        private AppSetting()
        {
        }
        public static int SessionExpireTime
        {
            get { return Convert.ToInt32(ConfigurationManager.AppSettings["SessionExpireTime"]); }
        }
        public static int SessionExpNotice
        {
            get { return Convert.ToInt32(ConfigurationManager.AppSettings["SessionExpNotice"]); }
        }
        public static string AppPath
        {
            get { return Convert.ToString(ConfigurationManager.AppSettings["AppPath"]); }
        }
    }
}