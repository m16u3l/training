//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebService.Data.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public System.Guid Id { get; set; }
        public string LogOnName { get; set; }
        public string PasswordHash { get; set; }
        public bool IsEnabled { get; set; }
        public Nullable<System.DateTime> ExpiryDate { get; set; }
        public System.DateTime PasswordChangeDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
