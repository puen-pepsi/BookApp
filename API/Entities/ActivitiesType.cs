namespace API.Entities
{
    public enum ActivitiesType
    {
        viewStory = 1,//story
        followStory = 2,//story
        likeChapter = 3,//story
        writeComment = 4,//story 
        writeChapter = 5,//story only author
        FirstRegister = 6,//One time
        FirstReadNovel = 7,// one time
        FirstTimeWriteNovel = 8,//one time
        FirstTimeWriteManga = 9,//one time
        moderatorRole =10,
        Adamantite = 11,
        Ranking =12,
        GiveTitle = 13,
    }
}