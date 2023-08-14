const express = require('express');
const router = express.Router();
const { Comment } = require('../../models/comment');


// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.update(req.body);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
