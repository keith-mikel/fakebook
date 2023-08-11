
const sequelize = require('../config/connection');
const { Bots, Comments, Posts, Users } = require('../models');

//import seeds
const botSeedsData = require('./botsData.json');
const userSeeds = require('./userData.json');

const seedDatabase = async () => {
    //sync database
    await sequelize.sync({ force: true });

    //Seeds users
    const users = await Users.bulkCreate(userSeeds, {
        individualHooks: true,
        returning: true
    })

    //Seeds bots
    const newBots = await Bots.bulkCreate(botSeedsData, {
        individualHooks: true,
        returning: true
    })

    //For each with the user id 
    for(const { id } of users){

        //Each user will will generate a post
        const newPost = await Posts.create(
            {
                body: "filler text", //random text 
                created_on: "8/10/2023", //TODO add working real time creation date
                created_by: id //the current users id
            }
        )

        //For loop that will generate a random amount of comments on the above post.
        //posts should have at least one comment
        for(let i = 0; i < (Math.floor(Math.random() * newBots.length) + 1); i++) {
            const newComments = await Comments.create(
                {
                    body: "filler text", //random text
                    created_on: "8/10/2023", //TODO add working real tim creation date
                    post_id: newPost.id, //id from the above post
                    created_by: newBots[Math.random() * newBots.length].id //A id randomly pulled from the 
                }
            )
        }
    }
}

seedDatabase();