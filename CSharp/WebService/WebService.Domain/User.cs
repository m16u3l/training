using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebService.Domain
{
    public class User
    {
        public System.Guid Id { get; set; }
        public string LogOnName { get; set; }
        public string PasswordHash { get; set; }
        public bool IsEnabled { get; set; }
        public System.DateTime? ExpiryDate { get; set; }
        public System.DateTime PasswordChangeDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
