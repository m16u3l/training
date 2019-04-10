using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData;
using System.Web.Http.Cors;
using WebService.Data.Model;

namespace WebService.Odata.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
            user.Id = Guid.NewGuid();
            DB.Users.Add(user);
            DB.SaveChanges();
            var userList = DB.Users.ToList();
            return userList;
        }

        [HttpPut]
        [EnableQuery]
        public IEnumerable<User> Put([FromODataUri] Guid key, User user)
        {
            var userToUpdate = DB.Users.FirstOrDefault(x => x.Id == key);
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
        public IEnumerable<User> Delete([FromODataUri] Guid key)
        {
            var userToDelete = DB.Users.FirstOrDefault(x => x.Id == key);
            DB.Users.Remove(userToDelete);
            DB.SaveChanges();
            var userList = DB.Users.ToList();
            return userList;
        }
    }
}
