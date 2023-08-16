const { Response, Comment, Post, Bot } = require('../../models');

const createCommentsFromResponses = async (postId) => {
  try {
    // Step 1: Retrieve the post and its sentiment score
    const post = await Post.findByPk(postId);

    // Step 2: Retrieve all bots with their associated responses
    const bots = await Bot.findAll({ include: Response });

    // Step 3: Find the closest response for each bot and create a comment
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

      // Convert the closest response into a comment and associate it with the post
      const commentData = {
        body: closestResponse.body,
        post_id: postId,
        created_by: bot.id,
      };

      await Comment.create(commentData);
      console.log(`Comment created successfully for bot ${bot.id}!`);
    }
  } catch (error) {
    console.error('Error creating comments:', error);
  }
};

module.exports = createCommentsFromResponses;