using ShifttyMaps.Authentication;
using ShifttyMaps.DataContext;
using ShifttyMaps.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShifttyMaps.Models;
using System.Web.Mvc;
using System.Text;
using System.Data.Entity;

namespace ShifttyMaps.Controllers
{
    [CustomAuthenticationFilter]
    public class UsersController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Users
        public ActionResult Index()
        {
            Session["ActiveTab"] = "2";
            return View();
        }
        [HttpPost]
        public PartialViewResult LoadUsers()
        {
            int userId = Numerics.GetInt(Session["UserId"].ToString());
            var list = db.Users.Where(x => x.roleid != 1 && x.userid != userId).ToList();
            return PartialView("~/Views/Users/_Load_Users.cshtml", list);
        }
        [HttpGet]
        public string chkUser(string username)
        {
            string result = "false";
            try
            {
                var chk = db.Users.Where(x => x.email == username).ToList();
                if (chk.Count > 0)
                {
                    result = "false";
                }
                else
                {
                    result = "true";
                }
            }
            catch
            {
                result = "false";
            }
            return result;
        }
        public string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
        public string RandomPassword(int size = 0)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, true));
            builder.Append(RandomString(2, false));
            builder.Append(RandomString(2, true));
            return builder.ToString();
        }
        [HttpPost]
        public string CreateUser(string FirstName, string LastName, string Email, int Role)
        {
            string res = "false";
            try
            {
                Users obj = new Users();
                {
                    obj.firstname = FirstName;
                    obj.lastname = LastName;
                    obj.email = Email;
                    obj.roleid = Role;
                    obj.createdby = Convert.ToInt32(Session["UserId"]);
                    obj.updatedby = Convert.ToInt32(Session["UserId"]);
                    obj.activestatus = Convert.ToInt32(EnumUtil.ActiveStatus.Active);
                    obj.createddate = DateTime.Now.Date;
                    obj.updateddate = DateTime.Now.Date;
                    obj.activestatus = 1;
                    string password = RandomPassword();
                    obj.password = Common.EncodePasswordToBase64(password);
                    var s = Common.SendRegistrationEmailNew(obj.firstname, obj.lastname, obj.email, password);
                    db.Users.Add(obj);
                    db.SaveChanges();
                }
                res = "true";
            }
            catch (Exception)
            {
                res = "false";
            }
            return res;

        }
        [HttpPost]
        public string DeleteConfirmed(int id)
        {
            string res = "false";
            try
            {
                Users users = db.Users.Find(id);
                db.Users.Remove(users);
                db.SaveChanges();
                res = "true";
            }
            catch (Exception)
            {
                res = "false";
            }
            return res;
        }
        [HttpGet]
        public JsonResult Edit(int id)
        {
            Users users = db.Users.Find(id);
            string FirstName = users.firstname;
            string LastName = users.lastname;
            string Email = users.email;
            int Role = users.roleid;
            return Json(new
            {
                id,
                FirstName,
                LastName,
                Email,
                Role
            }, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public string UpdateUser(int userId, string FirstName, string LastName, int Role)
        {
            string res = "false";
            try
            {
                var result = db.Users.AsNoTracking().Where(a => a.userid == userId).First();
                result.firstname = FirstName;
                result.lastname = LastName;
                result.roleid = Role;
                db.Entry(result).State = EntityState.Modified;
                db.SaveChanges();
                res = "true";
            }
            catch (Exception)
            {
                res = "false";
            }
            return res;

        }
        [AllowAnonymous]
        [HttpPost]
        public string SendPassword(string FName, string LName, string Email, string Password)
        {
            Password = Common.DecodeFrom64(Password);
            return Common.SendRegistrationEmailNew(FName, LName, Email, Password);

        }
    }
}