const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// @route   GET api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { tags: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const restaurants = await Restaurant.find(query).populate('categoryId');
        res.json(restaurants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/restaurants/:id
// @desc    Get restaurant by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('categoryId');
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET api/restaurants/:id/menu
// @desc    Get restaurant menu
// @access  Public
router.get('/:id/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ restaurant: req.params.id });
        res.json(menuItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
