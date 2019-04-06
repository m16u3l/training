using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using System.Web.Http.OData;

using WebService.Data.Model;

namespace WebService.Odata.Controllers
{
    public class UsersController : ODataController
    {
        UserConnection DB = new UserConnection();
        [HttpGet]
        public IEnumerable<User> Get()
        {
            var userList = DB.Users.ToList();
            return userList;
        }
    }
}
