using System.Web;
using System.Web.Optimization;

namespace ShifttyMaps
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                            "~/Scripts/jquery-3.3.1.js",
                            "~/Scripts/jquery.validate.js",
                            "~/Scripts/anime.js",
                            "~/Scripts/jquery-waves.js",
                            "~/Scripts/popper.min.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                          "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/css/style.css"));
        }
    }
}
