//models
const sequelize = require('../config/connection');
const Users = require('../models/user')
const Bots = require('../models/bot')
const Posts = require('../models/post')
const Comments = require('../models/comment')
const Responses = require('../models/response')

//import seeds
const botSeedsData = require('./botsData.json');
const userSeeds = require('./userData.json');
const postSeeds = require('./postsData.json');
const commentSeeds = require('./commentsData.json');
const responseSeeds = require('./responseData.json')
const seedDatabase = async () => {
    //sync database
    await sequelize.sync({ force: true });

    //Seeds users
    const usersList = await Users.bulkCreate(userSeeds, {
        individualHooks: true,
        returning: true
    })

    //Seeds bots
    const newBots = await Bots.bulkCreate(botSeedsData, {
        individualHooks: true,
        returning: true
    })

    const newPosts = await Posts.bulkCreate(postSeeds,{
        individualHooks: true,
        returning: true
    })

    const newComment = await Comments.bulkCreate(commentSeeds,{
        individualHooks: true,
        returning: true
    })

    const newResponse = await Responses.bulkCreate(responseSeeds,{
        individualHooks: true,
        returning: true
    })
}

seedDatabase();