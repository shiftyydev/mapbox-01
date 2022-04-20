using ShifttyMaps.DataContext;
using ShifttyMaps.Models;
using ShifttyMaps.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShifttyMaps.Controllers
{
    public class LoginController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            Session["roleId"] = null;
            Session["UserId"] = null;
            Session["UserName"] = null;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(Users users)
        {
            if (ModelState.IsValid)
            {
                string Password = Common.EncodePasswordToBase64(users.password);
                //string Password = users.password;
                var objUsers = db.Users.Where(a => a.email.Equals(users.email) && a.password.Equals(Password)).FirstOrDefault();
                if (objUsers != null)
                {
                    Session["roleId"] = objUsers.roleid;
                    Session["UserId"] = objUsers.userid;
                    Session["UserName"] = objUsers.firstname + " " + objUsers.lastname;
                    Session.Timeout = 540;
                    return Redirect("~/Map/Index");
                }
                else
                {
                    TempData["Error"] = "Invalid email or password!";
                    return RedirectToAction("Index");
                }
            }
            return RedirectToAction("Create");
        }
    }
}