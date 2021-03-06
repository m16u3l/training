﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;

using WebService.Data.Model;

namespace WebService.OData
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();
            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<User>("Users");
            config.Routes.MapODataServiceRoute(
                routeName: "ODataRoute",
                routePrefix: "oData",
                model: builder.GetEdmModel()
            );
        }
    }
}
