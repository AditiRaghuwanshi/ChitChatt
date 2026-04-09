import { Chat } from "../models/chat.js";
import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import mongoose from "mongoose";







const createSingleChat = async () => {
    try {
        const users = await User.find().select("_id");

        const chatsPromise = [];

        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) { // Fixed loop condition
                chatsPromise.push(
                    Chat.create({
                        namee: faker.lorem.words(2),
                        members: [users[i]._id, users[j]._id], // Ensure _id is used
                    })
                );
            }
        }

        await Promise.all(chatsPromise);
        console.log("Chats created successfully!");
        // process.exit(1);
    } catch (error) {
        console.error("Error creating chats:", error);
        // process.exit(1);
    }
};



const createGroupChat = async (numGroups, minMembers = 3) => {
    try {
        const users = await User.find().select("_id");

        if (users.length < minMembers) {
            console.log("Not enough users to create group chats.");
            return;
        }

        const groupChatsPromise = [];

        for (let i = 0; i < numGroups; i++) {
            // Shuffle users randomly
            const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
            const numMembers = faker.number.int({ min: minMembers, max: users.length });
            const members = shuffledUsers.slice(0, numMembers); // Pick random members

            groupChatsPromise.push(
                Chat.create({
                    namee: faker.lorem.words(2), // Random chat namee
                    members: members.map(user => user._id), // Extract user IDs
                    groupChat: true,
                    creator: members[0]._id, // First user as creator
                })
            );
        }

        await Promise.all(groupChatsPromise);
        console.log(`${numGroups} group chats created successfully!`);
        // process.exit(1);
    } catch (error) {
        console.error("Error creating group chats:", error);
        // process.exit(1);
    }
};


const createMessages = async (numMessages) => {
    try {
        const users = await User.find().select("_id"); // Fetch all user IDs
        const chats = await Chat.find().select("_id"); // Fetch all chat IDs

        if (users.length === 0 || chats.length === 0) {
            console.log("Not enough users or chats to create messages.");
            return;
        }

        const messagesPromise = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]._id;
            const randomChat = chats[Math.floor(Math.random() * chats.length)]._id;

            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content: faker.lorem.sentence(), // Generates fake message text
                })
            );
        }

        await Promise.all(messagesPromise);
        console.log(`${numMessages} messages created successfully!`);
        process.exit(1);
    } catch (error) {
        console.error("Error creating messages:", error);
        process.exit(1);
    }
};


// const createMessageInAChat = async (chatId, userId, numMessages) => {
//     try {
//         // Check if user and chat exist
//         const userExists = await User.findById(userId).select("_id");
//         if (!userExists) {
//             console.log("User not found");
//             return;
//         }

//         const messagesPromise = [];

//         for (let i = 0; i < numMessages; i++) {
//             messagesPromise.push(
//                 Message.create({
//                     chat: chatId, // Specific chat
//                     sender: userId, // Specific user
//                     content: faker.lorem.sentence(), // Random fake message
//                 })
//             );
//         }

//         await Promise.all(messagesPromise);
//         console.log(`${numMessages} messages created in chat ${chatId} by user ${userId}`);
//         process.exit(1);
//     } catch (error) {
//         console.error("Error creating messages:", error);
//         process.exit(1);
//     }
// };



// const createMessageInAChat = async (chatId, numMessages) => {
//     try {
//         // Validate chatId
//         if (!mongoose.Types.ObjectId.isValid(chatId)) {
//             throw new Error(`Invalid chatId: ${chatId}`);
//         }

//         // Fetch a random user from the database (ensuring valid ObjectId)
//         const randomUser = await User.findOne().select("_id");

//         if (!randomUser) {
//             console.log("❌ No users found in the database.");
//             return;
//         }

//         const messagesPromise = [];

//         for (let i = 0; i < numMessages; i++) {
//             messagesPromise.push(
//                 Message.create({
//                     chat: chatId,
//                     sender: randomUser._id, // Use the fetched user ID
//                     content: faker.lorem.sentence(),
//                 })
//             );
//         }

//         await Promise.all(messagesPromise);
//         console.log(`✅ Created ${numMessages} messages in chat ${chatId}`);
//     } catch (error) {
//         console.error("❌ Error creating messages:", error);
//     }
// };


const createMessageInAChat = async (chatId, numMessages) => {
    try {
        console.log(`📝 Creating ${numMessages} messages in chat ${chatId}`);

        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new Error(`chatId: ${chatId}`);
        }

        const randomUser = await User.findOne().select("_id");

        if (!randomUser) {
            throw new Error("❌ No users found in the database.");
        }

        const messagesPromise = [];
        for (let i = 0; i < numMessages; i++) {
            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser._id,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagesPromise);
        console.log(`✅ Created ${numMessages} messages successfully.`);
    } catch (error) {
        console.error("❌ Error in createMessageInAChat:", error);
    }
};







export { createSingleChat, createGroupChat, createMessages, createMessageInAChat }

