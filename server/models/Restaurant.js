const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    rating: {
        type: Number,
        default: 0,
    },
    deliveryTime: String, // e.g., "30-45 min"
    priceRange: String, // e.g., "$", "$$", "$$$"
    image: {
        type: String,
        required: true,
    },
    tags: [String], // e.g., ["Fast Food", "Burger"]
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    featured: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
