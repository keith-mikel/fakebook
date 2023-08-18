const { Response, Comment, Post, Bot } = require('../../models');

const createCommentsFromResponses = async (postId) => {
  try {
    // Step 1: Retrieve the post and its sentiment score
    const post = await Post.findByPk(postId);

    // Step 2: Retrieve all bots with their associated responses
    const bots = await Bot.findAll({ include: Response });

    // Define a function to create a comment with a delay
    const createCommentWithDelay = async (bot, closestResponse) => {
      const commentData = {
        body: closestResponse.body,
        post_id: postId,
        created_by: bot.id,
      };

      await Comment.create(commentData);
      console.log(`Comment created successfully for bot ${bot.id}!`);
    };

    // Step 3: Find the closest response for each bot and create a comment with a delay
    for (const bot of bots) {
      let closestResponse = null;
      let closestDifference = Infinity;

      for (const response of bot.responses) {
        const difference = Math.abs(response.sentimentScore - post.sentimentScore);
        if (difference < closestDifference) {
          closestDifference = difference;
          closestResponse = response;
        }
      }

      if (!closestResponse) {
        console.log(`No suitable response found for bot ${bot.id}.`);
        continue;
      }

      // Create a comment with a delay of 10 seconds for each bot
      setTimeout(async () => {
        await createCommentWithDelay(bot, closestResponse);
      }, 10000 * bot.id); // Each bot's comment will be delayed by 10 seconds times its id
    }
  } catch (error) {
    console.error('Error creating comments:', error);
  }
};

module.exports = createCommentsFromResponses;
