using System;

namespace API.Extensions
{
    public static class StateExtensions
    {
        public static string GetState(this DateTime create,string state)
        {
            if(state == "Ended")return "Ended";
            var today = DateTime.Today;
            var old = today- create;

            if ( old.Days < 14) return "New";
            return "Ongoing";
        }
    }
}