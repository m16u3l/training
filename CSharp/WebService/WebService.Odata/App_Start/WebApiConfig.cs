using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;

using WebService.Data.Model;

namespace WebService.Odata
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();
            // New code:
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<User>("Users");
            config.Routes.MapODataServiceRoute(
                routeName: "ODataRoute",
                routePrefix: "oData",
                model: builder.GetEdmModel()
            //"ODataRoute", "oData", builder.GetEdmModel()
            );
        }
    }
}
