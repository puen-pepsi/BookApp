using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using EmailService;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmailSender _emailSender;
        public ContactController(IUnitOfWork unitOfWork, IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _unitOfWork = unitOfWork;

        }
        [HttpPost]
        public async Task<ActionResult> ContactUs(ContactDto contactDto)
        {
            var html = new StringBuilder();
            html.Append(string.Format("<h4>Contact From : {0}</h4><br/>"+
                    "<p>Email : {1}</p><br/>"+
                    "<p>{2}</p>",contactDto.Fullname,contactDto.Email,contactDto.Content));

            var message = new MailMessage(new string[] { "rainobu.official@gmail.com" }, "Rainobu Contact", 
                html.ToString(), null);
                await _emailSender.SendEmailAsync(message);
            return Ok();
        }
    }
}