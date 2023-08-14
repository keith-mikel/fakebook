
const sequelize = require('../config/connection');
const Users = require('../models/users')
const Bots = require('../models/bots')
const Posts = require('../models/posts')
const Comments = require('../models/comments')

//import seeds
const botSeedsData = require('./botsData.json');
const userSeeds = require('./userData.json');
const postSeeds = require('./postsData.json');
const commentSeeds = require('./commentsData.json');
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
}

seedDatabase();