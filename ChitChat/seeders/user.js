import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";



const createUser = async(numUsers) => {
    try{
        
        const usersPromise = [];
        for(let i = 0; i<numUsers; i++){
           const tempUser = User.create({
            namee:faker.person.namee(),
            username: faker.internet.username(),
            bio: faker.lorem.sentence(10),
            password: "password",
            avatar: {
                url: faker.image.avatar(),
                public_id: faker.system.filenamee(),
            },
           });
           usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);
        console.log("users created", numUsers);
        process.exit(1);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


export { createUser }
