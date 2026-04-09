

export const sampleChats =
 [
   

{
    avatar: ["https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?t=st=1742717835~exp=1742721435~hmac=56a732645bba652afa7d41d81d37e567515b68f4f7580aaba5afbf3ce899cbcb&w=826"],
    namee: "aditi",
    _id: "1",
    groupChat : true,
    members:["1", "2"],


},


{
    avatar: [
    "https://www.w3schools.com/howto/img_avatar.png", 
    ],
    namee: "priyansh",
    _id: "2",
    groupChat : true,
    members:["1", "2"],


},




];


export const sampleUsers = [{
    avatar: [
        "https://www.w3schools.com/howto/img_avatar.png", 
        ],
        namee: "priyansh",
        _id: "2",
       
},


{
    avatar: ["https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?t=st=1742717835~exp=1742721435~hmac=56a732645bba652afa7d41d81d37e567515b68f4f7580aaba5afbf3ce899cbcb&w=826"],
    namee: "aditi",
    _id: "1",
},






];




export const sampleNotifications = [
    {

    
    sender:{
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
            namee: "priyansh",

    },
    _id: "1",

       
},


{
    sender:{
        avatar: "https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?t=st=1742717835~exp=1742721435~hmac=56a732645bba652afa7d41d81d37e567515b68f4f7580aaba5afbf3ce899cbcb&w=826",
        namee: "aditi",
    },
    _id: "2",
},



];








export const sampleMessage = [

    {
        attachments: [
         
        ],
        
            content: "Radhe Radhe",
            _id: "jfeijrf1",
            sender:{
                _id: "user._id",
                namee:"chaman",
            },
            chat: "chatId",
            createdAt: "2024-02-12T10:41:30.630Z"

        
    },




    {
        attachments: [
            {
                public_id: "fnfnriefnm 2",
                url:"https://www.w3schools.com/howto/img_avatar.png",

            },
        ],
        
            // content: "Radhe Radhe bolo",
            _id: "jfeijrf",
            sender:{
                _id: "2 ",
                namee:"chaman 2",
            },
            chat: "chatId2",
            createdAt: "2024-02-12T10:41:30.630Z"

        
    },
];





export const dashboardData = {

    users: [
        {
        avatar: [
           "https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?t=st=1742717835~exp=1742721435~hmac=56a732645bba652afa7d41d81d37e567515b68f4f7580aaba5afbf3ce899cbcb&w=826",

        ],
        namee: "aditi",
        _id: "1",
        username: "pokemon1",
        friends: 10,
        groups: 20,
       
    
    
    },

    {
        avatar: [
        "https://www.w3schools.com/howto/img_avatar.png", 
        ],
        namee: "priyansh",
        _id: "2",
       username: "pokemon2",
       friends: 10,
       groups: 20,
    
    
    },
],

 chats : [
   
    {
        id: "1",
        namee: "John Doe",
        avatar: ["https://randomuser.me/api/portraits/men/1.jpg"],
        totalMembers: 50,
        members: [
          { id: "1", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
          { id: "2", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
        ],
        totalMessages: 1200,
        creator: {
          namee: "Alice Smith",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
      },
      {
        id: "2",
        namee: "Jane Doe",
        avatar: ["https://randomuser.me/api/portraits/women/4.jpg"],
        totalMembers: 30,
        members: [
          { id: "3", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
          { id: "4", avatar: "https://randomuser.me/api/portraits/women/13.jpg" },
        ],
        totalMessages: 800,
        creator: {
          namee: "Bob Johnson",
          avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
      },
      {
        id: "3",
        namee: "Michael Brown",
        avatar: ["https://randomuser.me/api/portraits/men/9.jpg"],
        totalMembers: 70,
        members: [
          { id: "5", avatar: "https://randomuser.me/api/portraits/men/14.jpg" },
          { id: "6", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
        ],
        totalMessages: 1500,
        creator: {
          namee: "Emily Davis",
          avatar: "https://randomuser.me/api/portraits/women/16.jpg",
        },
      },
      
  ],




  messages: [


    {
        attachments: [
            {
                public_id: "fnfnriefnm 2",
                url:"https://www.w3schools.com/howto/img_avatar.png",

            }  
        ],
        
            groupChat: true,
            content: "Radhe Radhe",
            _id: "jfeijrf1",
            sender:{
                _id: "https://www.w3schools.com/howto/img_avatar.png",
                avatar:"chaman",
            },
            chat: "chatId",
            CreatedAt: "2024-02-12T10:41:30.630Z"

        
    },




    {
        attachments: [
            {
                public_id: "fnfnriefnm 2",
                url:"https://www.w3schools.com/howto/img_avatar.png",

            },
        ],
        
            groupChat: true,
            content: "Radhe Radhe bolo",
            _id: "jfeijrf",
            sender:{
                _id: "2 ",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            },
            chat: "chatId2",
            CreatedAt: "2024-02-12T10:41:30.630Z"

        
    },

  ]
  
      
}






