const express = require('express');
const MenuItem = require('../models/menuItem');
const router = express.Router();

// POST /menu - Add a new menu item
router.post('/menu', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: 'Menu item created successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// GET /menu - Retrieve all menu items
router.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

module.exports = router;
