using WebService.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebService.Api.Controllers
{
    public class UserController : ApiController
    {
        UserConnection DB = new UserConnection();
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return DB.Users.ToList();
        }
        [HttpGet]
        public User Get(string name)
        {
            var user =  DB.Users.FirstOrDefault(x=> x.FirstName == name);
            return user;
        }
        [HttpPost]
        public bool Post(User user)
        {
            DB.Users.Add(user);
            return DB.SaveChanges() > 0;
        }
        [HttpPut]
        public bool Put(User user)
        {
            var userToUpdate = DB.Users.FirstOrDefault(x=> x.FirstName == user.FirstName);
            userToUpdate.LogOnName = user.LogOnName;
            userToUpdate.PasswordHash = user.PasswordHash;
            userToUpdate.IsEnabled = user.IsEnabled;
            userToUpdate.ExpiryDate = user.ExpiryDate;
            userToUpdate.PasswordChangeDate = user.PasswordChangeDate;
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            return DB.SaveChanges() > 0;
        }
        [HttpDelete]
        public bool Delete(string name)
        {
            var userToDelete = DB.Users.FirstOrDefault(x=> x.FirstName == name);
            DB.Users.Remove(userToDelete);
            return DB.SaveChanges() > 0;
        }
    }
}
