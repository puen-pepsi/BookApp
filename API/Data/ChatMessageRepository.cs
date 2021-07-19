using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ChatMessageRepository : IChatMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ChatMessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddMessage(ChatMessage chatMessage)
        {
             _context.ChatMessages.Add(chatMessage);
        }

        public void DeleteMessage(ChatMessage chatMessage)
        {
            _context.ChatMessages.Remove(chatMessage);
        }

        public async Task<ChatMessage> GetMessage(int id)
        {
            return await _context.ChatMessages
                        .Include(u => u.UserChat)
                        .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ChatMessageDto>> GetChatThread(string groupName)
        {
              var messages = await _context.ChatMessages
                .Where(g => g.GroupName == groupName)
                .OrderBy(m => m.Created)
                .ProjectTo<ChatMessageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return messages;
        }
    }
}