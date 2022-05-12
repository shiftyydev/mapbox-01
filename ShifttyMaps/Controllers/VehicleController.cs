using ShifttyMaps.Authentication;
using ShifttyMaps.DataContext;
using ShifttyMaps.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShifttyMaps.Controllers
{
    [CustomAuthenticationFilter]
    public class VehicleController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Trucks
        public ActionResult Index()
        {
            Session["ActiveTab"] = "3";
            return View();
        }
        [HttpPost]
        public PartialViewResult LoadVehicles()
        {
            var list = db.Vehicles.ToList();
            return PartialView("~/Views/Vehicle/_LoadVehicle.cshtml", list);
        }
        [HttpPost]
        public string CreateVehicle(string Name, string VehicleId,string APIKey)
        {
            string res = "false";
            try
            {
                Vehicles obj = new Vehicles();
                {
                    obj.name = Name;
                    obj.vehicle_id = VehicleId;
                    obj.api_key = APIKey;
                    db.Vehicles.Add(obj);
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
        public string DeleteVehicle(int id)
        {
            string res = "false";
            try
            {
                Vehicles vehicles = db.Vehicles.Find(id);
                db.Vehicles.Remove(vehicles);
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
            Vehicles obj = db.Vehicles.Find(id);
            string name = obj.name;
            string vehicle_id = obj.vehicle_id;
            string api_key = obj.api_key;
            return Json(new
            {
                name,
                vehicle_id,
                api_key
            }, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public string UpdateVehicle(int editId, string Name, string VehicleId,string APIKey)
        {
            string res = "false";
            try
            {
                var result = db.Vehicles.Find(editId);
                result.name = Name;
                result.vehicle_id = VehicleId;
                result.api_key = APIKey;
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

    }
}