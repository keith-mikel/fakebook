const express = require('express');
const router = express.Router();
const { Bot } = require('../../models/bot'); // Make sure your model file path is correct

const app = express();
app.use(express.json());

// Get all bots
app.get('/', async (req, res) => {
  try {
    const bots = await Bot.findAll();
    res.json(bots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific bot by ID
app.get('/:id', async (req, res) => {
  try {
    const bot = await Bot.findByPk(req.params.id);
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    res.json(bot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a bot
app.put('/:id', async (req, res) => {
  try {
    const bot = await Bot.findByPk(req.params.id);
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    await bot.update(req.body);
    res.json(bot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a bot
app.delete('/:id', async (req, res) => {
  try {
    const bot = await Bot.findByPk(req.params.id);
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    await bot.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;