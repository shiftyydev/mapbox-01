using ShifttyMaps.Authentication;
using ShifttyMaps.DataContext;
using ShifttyMaps.Models;
using ShifttyMaps.Utility;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShifttyMaps.Controllers
{
    [CustomAuthenticationFilter]
    public class ProfileController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Profile
        public ActionResult Index()
        {
            Users users = db.Users.Find(Convert.ToInt32(Session["UserId"]));
            users.oldPassword = users.password;
            return View(users);
        }
        public ActionResult ChangePassword(Users objModel)
        {
            Users users = db.Users.Find(Convert.ToInt32(Session["UserId"]));
            if (objModel.password != objModel.repassword)
            {
                TempData["IncorrectOldPassword"] = "Password Does Not Match";
                return RedirectToAction("Index");
            }
            if (users.password == Common.EncodePasswordToBase64(objModel.oldPassword))
            {
                string Password = Common.EncodePasswordToBase64(objModel.password);
                users.password = Password;
                db.Entry(users).State = EntityState.Modified;
                db.SaveChanges();
                Session.Clear();
                Session.RemoveAll();
                Session.Abandon();
                return Redirect("~/Login/Index");
            }
            else
            {
                TempData["IncorrectOldPassword"] = "Old password is not correct";
                return RedirectToAction("Index");
            }
        }
        public ActionResult ChangePersonalInfo(Users objModel)
        {
            Users users = db.Users.Find(Convert.ToInt32(Session["UserId"]));

            users.firstname = objModel.firstname;
            users.lastname = objModel.lastname;

            db.Entry(users).State = EntityState.Modified;
            db.SaveChanges();
            Session["UserName"] = objModel.firstname + " " + objModel.lastname;

            TempData["Success"] = "Information updated successfully";
            return RedirectToAction("Index");
        }
    }
}