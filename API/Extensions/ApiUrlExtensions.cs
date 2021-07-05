using API.Helpers;

namespace API.Extensions
{
    public static class ApiUrlExtensions
    {
        
        public static string GetUrl(this string source)
        {
            var serviceUrl = ConfigHelper.AppSetting("ApiUrl");
             if (!string.IsNullOrEmpty(source)) 
            {
                return serviceUrl + source;
            }
            return null;
        }
    }
}