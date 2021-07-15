using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IChatMessageRepository
    {
        void AddMessage(ChatMessage chatMessage);
        void DeleteMessage(ChatMessage chatMessage);
        Task<ChatMessage> GetMessage(int id);
        Task<IEnumerable<ChatMessageDto>> GetChatThread(string groupName);
    }
}