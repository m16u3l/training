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
        [EnableQuery]
        public IEnumerable<User> Get()
        {
            var userList = DB.Users.ToList();
            return userList;
        }
        [HttpPost]
        [EnableQuery]
        public IEnumerable<User> Post(User user)
        {
            DB.Users.Add(user);
            DB.SaveChanges();
            var userList = DB.Users.ToList();
            return userList;
        }

        [HttpPut]
        [EnableQuery]
        public IEnumerable<User> Put([FromODataUri] string key, User user)
        {
            var userToUpdate = DB.Users.FirstOrDefault(x => x.FirstName == key);
            userToUpdate.LogOnName = user.LogOnName;
            userToUpdate.PasswordHash = user.PasswordHash;
            userToUpdate.IsEnabled = user.IsEnabled;
            userToUpdate.ExpiryDate = user.ExpiryDate;
            userToUpdate.PasswordChangeDate = user.PasswordChangeDate;
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            DB.SaveChanges();
            var userList = DB.Users.ToList();
            return userList;
        }

        [HttpDelete]
        [EnableQuery]
        public IEnumerable<User> Delete([FromODataUri] string key)
        {
            var userToDelete = DB.Users.FirstOrDefault(x => x.FirstName == key);
            DB.Users.Remove(userToDelete);
            DB.SaveChanges();
            var userList = DB.Users.ToList();
            return userList;
        }
    }
}
