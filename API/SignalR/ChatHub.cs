using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;
        public ChatHub(IMapper mapper, IUnitOfWork unitOfWork, IHubContext<PresenceHub> presenceHub, 
                PresenceTracker tracker)
        {
            _tracker = tracker;
            _presenceHub = presenceHub;
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public override async Task OnConnectedAsync() 
        {
            // var httpContext = Context.GetHttpContext();
            //Get from request
            // var storyName = 
            var groupName = "openChat";
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var group = await AddToGroup(groupName);
            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);
            //get messages 
            var massages = await _unitOfWork.ChatMessageRepository.
                GetChatThread(groupName);

            if (_unitOfWork.HasChanges()) await _unitOfWork.Complete();

            await Clients.Caller.SendAsync("ReceiveChatMessage", massages);

        }
        
         public override async Task OnDisconnectedAsync(Exception exception)
        {
            var group = await RemoveFromMessageGroup();
            await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);
            await base.OnDisconnectedAsync(exception);
        }
        private async Task<Group> AddToGroup(string groupName)
        {
            var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

            if (group == null)
            {
                group = new Group(groupName);
                _unitOfWork.MessageRepository.AddGroup(group);
            }

            group.Connections.Add(connection);

            if (await _unitOfWork.Complete()) return group;

            throw new HubException("Failed to join group");
        }
        private async Task<Group> RemoveFromMessageGroup()
        {
            var group = await _unitOfWork.MessageRepository.GetGroupForConnection(Context.ConnectionId);
            var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            _unitOfWork.MessageRepository.RemoveConnection(connection);
            if (await _unitOfWork.Complete()) return group;

            throw new HubException("Failed to remove from group");
        }
        public async Task SendMessags(CreateChatMessagesDto createChatMessagesDto)
        {
            var username = Context.User.GetUsername();
            // if (username == createMessageDto.RecipientUsername.ToLower())
            //     throw new HubException("You cannot send messages to yourself");

            var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
           // var storyCur = await _unitOfWork.StoryRepository.GetStoryByName(createChatMessagesDto.GroupName);

            //if (storyCur == null) throw new HubException("Not found story");

            var messages = new ChatMessage
            {
                GroupName = createChatMessagesDto.GroupName,
                Content =  createChatMessagesDto.Content,
                UserChat = sender,
                UserChatId = sender.Id
            };

            var groupName = createChatMessagesDto.GroupName;

            var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);

            //Add message
           _unitOfWork.ChatMessageRepository.AddMessage(messages);

            if (await _unitOfWork.Complete())
            {
                await Clients.Group(groupName).SendAsync("NewChatMessage", _mapper.Map<ChatMessageDto>(messages));
            }
        }
    }
}