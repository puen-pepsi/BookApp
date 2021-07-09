using System.Threading.Tasks;

namespace EmailService
{
    public interface IEmailSender
    {
         void SendEmail(MailMessage message);
         Task SendEmailAsync(MailMessage message);
    }
}