const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    image: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    category: {
        type: String, // e.g., "Burger", "Drink", "Side" local to the restaurant menu structure
    },
    featured: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
