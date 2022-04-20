using Newtonsoft.Json;
using ShifttyMaps.Authentication;
using ShifttyMaps.DataContext;
using ShifttyMaps.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ShifttyMaps.Controllers
{
    [CustomAuthenticationFilter]
    public class MapController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            Session["ActiveTab"] = "1";
            return View();
        }
        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }
        [HttpGet]
        public async Task<JsonResult> GetRouteSplited(string FromDate, string ToDate, string VehicleId, string name)
        {
            using (var clientShiffty = new HttpClient())
            {
                //string urlShiffty = "https://gps-api.shiftyy.com/objects/c48d2a62-52b4-11eb-8dcd-6fd375e1d7de/coordinates?version=2&from_datetime=2022-04-15T15:00:00Z&to_datetime=2022-04-15T18:00:00Z&limit=1000&api_key=Zlj5pAw8n4De5Edfzsb5EzEiyrpzoIJv";
                string urlShiffty = "https://gps-api.shiftyy.com/objects/" + VehicleId + "/coordinates?version=2&from_datetime=" + FromDate + "&to_datetime=" + ToDate + "&limit=1000&api_key=Zlj5pAw8n4De5Edfzsb5EzEiyrpzoIJv";
                var JSONStringNewRoute = new StringBuilder();
                JSONStringNewRoute.Append("{");
                JSONStringNewRoute.Append("\"type\":");
                JSONStringNewRoute.Append("\"FeatureCollection\" , ");
                JSONStringNewRoute.Append("\"features\" :[ ");


                var JSONStringNewPoint = new StringBuilder();
                JSONStringNewPoint.Append("{");
                JSONStringNewPoint.Append("\"type\":");
                JSONStringNewPoint.Append("\"FeatureCollection\" , ");
                JSONStringNewPoint.Append("\"features\" :[ ");
                int loop = 0;
                using (var responseShiffty = await clientShiffty.GetAsync(urlShiffty))
                {
                    var fileJsonStringShiffty = await responseShiffty.Content.ReadAsStringAsync();
                    dynamic deserialized = JsonConvert.DeserializeObject(fileJsonStringShiffty);   
                    string globalLng = null;
                    string globalLat = null;
                    DateTime? globalTime = null;
                    foreach (var itemShiffty in deserialized.items)
                    {

                        var obj = itemShiffty.object_id.Value;
                        var time = itemShiffty.datetime.Value;
                        var position = itemShiffty.position;
                        var latitude = itemShiffty.position.latitude.Value;
                        var longitude = itemShiffty.position.longitude.Value;
                        var speed = itemShiffty.position.speed.Value;
                        var testValue = itemShiffty.inputs.device_inputs;
                        var idling_time = testValue.ecodrive_idling_time.Value;
                        var movement = testValue.movement.Value;
                        double ChkSpeed = Numerics.GetDouble(itemShiffty.position.speed.Value);
                        var direction = Numerics.getDirection(Numerics.GetDouble(itemShiffty.position.direction.Value));
                        DateTime d = Convert.ToDateTime(time);
                        string easternZoneId = "SA Western Standard Time";
                        TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById(easternZoneId);
                        d = TimeZoneInfo.ConvertTimeFromUtc(d, easternZone);
                        string pLng = null;
                        string pLat = null;
                        DateTime? pTime = null;
                        if (loop != 0)
                        {
                            pLng = globalLng;
                            pLat = globalLat;
                            pTime = globalTime;

                            globalLng = Convert.ToString(longitude);
                            globalLat = Convert.ToString(latitude);
                            globalTime = d;

                        }
                        loop = 1;
                        if (Numerics.GetDouble(latitude) != 0 && Numerics.GetDouble(longitude) != 0 && Numerics.GetDouble(pLat) != 0 && Numerics.GetDouble(pLng) != 0)
                        {
                            JSONStringNewRoute.Append("{\"type\": \"Feature\", \"color\": \"#0394fc\", \"geometry\": {\"type\": \"LineString\", \"coordinates\": [[" + pLng + ", " + pLat + "], [" + longitude + ", " + latitude + "]]}},");
                        }
                        if (Numerics.GetDouble(latitude) != 0 && Numerics.GetDouble(longitude) != 0)
                        {
                            string directionNew = direction.ToString();
                            if (ChkSpeed == 0)
                            {
                                directionNew = "RouteStop";
                            }
                            JSONStringNewPoint.Append("{\"type\": \"Feature\", \"geometry\": {\"type\": \"Point\", \"coordinates\": [" + longitude + ", " + latitude + "]}, \"properties\": {  \"time\": \"" + d.ToString("dd/MMM/yyyy HH:mm:ss") + "\", \"speed\": \"" + speed + "\", \"idling\": " + idling_time + ", \"direction\": \"" + directionNew + "\"}},");
                        }
                    }
                }

                string JSONRoute = JSONStringNewRoute.ToString();
                string JSONPoints = JSONStringNewPoint.ToString();
                JSONRoute = JSONRoute.TrimEnd(',');
                JSONPoints = JSONPoints.TrimEnd(',');
                JSONRoute += "]}";
                JSONPoints += "]}";
                return Json(new
                {
                    JSONRoute = JSONRoute,
                    JSONPoints = JSONPoints,
                    Count = loop.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult getVehiclesForLegends()
        {
            var list = db.Vehicles.ToList();
            string JSONVehicles = JsonConvert.SerializeObject(list);
            return Json(new
            {
                JSONVehicles = JSONVehicles
            }, JsonRequestBehavior.AllowGet);
        }
    }

}