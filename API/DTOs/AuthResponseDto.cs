namespace API.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; }
        public bool IsAuthSuccessful { get; set; }
    }
}