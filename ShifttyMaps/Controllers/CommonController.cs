using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShifttyMaps.Controllers
{
    public class CommonController : Controller
    {
        // GET: Common
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ResetSession()
        {
            return Json(Session.Timeout, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public string ChkSession()
        {
            if (Session["UserId"] != null)
            {
                return Session["UserId"].ToString();
            }
            else
            {
                return "";
            }

        }
    }
}