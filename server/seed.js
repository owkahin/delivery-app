const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Category.deleteMany();
        await Restaurant.deleteMany();
        await MenuItem.deleteMany();

        console.log('Data cleared...');

        // Categories
        const categories = await Category.insertMany([
            { name: 'Ethiopian', image: '/images/ethiopian.png' },
            { name: 'Fast Food', image: '/images/fast-food.png' },
            { name: 'Cafe', image: '/images/cafe.png' },
            { name: 'Traditional', image: '/images/traditional.png' },
            { name: 'Breakfast', image: '/images/breakfast.png' },
            { name: 'Dessert', image: '/images/dessert.png' },
        ]);

        console.log('Categories seeded...');

        // Jigjiga Restaurants
        const hamaressa = await Restaurant.create({
            name: 'Hamaressa Hotel & Restaurant',
            description: 'Premium Ethiopian cuisine and international dishes',
            rating: 4.7,
            deliveryTime: '25-35 min',
            priceRange: '$$$',
            image: '/images/hamaressa.png',
            tags: ['Ethiopian', 'Traditional', 'Fine Dining'],
            categoryId: categories[0]._id,
            featured: true
        });

        const jijigaCafe = await Restaurant.create({
            name: 'Jigjiga Cafe & Bakery',
            description: 'Fresh pastries, coffee, and light meals',
            rating: 4.5,
            deliveryTime: '15-25 min',
            priceRange: '$$',
            image: '/images/jigjiga-cafe.png',
            tags: ['Cafe', 'Bakery', 'Coffee'],
            categoryId: categories[2]._id,
            featured: true
        });

        const sumaleRestaurant = await Restaurant.create({
            name: 'Sumale Restaurant',
            description: 'Authentic Somali and Ethiopian cuisine',
            rating: 4.6,
            deliveryTime: '20-30 min',
            priceRange: '$$',
            image: '/images/sumale.png',
            tags: ['Ethiopian', 'Somali', 'Traditional'],
            categoryId: categories[0]._id,
            featured: true
        });

        const karamardaHotel = await Restaurant.create({
            name: 'Karamarda Hotel Restaurant',
            description: 'Local favorites and traditional dishes',
            rating: 4.4,
            deliveryTime: '30-40 min',
            priceRange: '$$',
            image: '/images/karamarda.png',
            tags: ['Ethiopian', 'Local'],
            categoryId: categories[3]._id,
            featured: false
        });

        const greenCafe = await Restaurant.create({
            name: 'Green Cafe',
            description: 'Modern cafe with fresh juices and snacks',
            rating: 4.3,
            deliveryTime: '15-20 min',
            priceRange: '$',
            image: '/images/green-cafe.png',
            tags: ['Cafe', 'Juice', 'Snacks'],
            categoryId: categories[2]._id,
            featured: false
        });

        const fastFoodJigjiga = await Restaurant.create({
            name: 'Jigjiga Fast Food',
            description: 'Quick bites and local fast food',
            rating: 4.2,
            deliveryTime: '10-20 min',
            priceRange: '$',
            image: '/images/jigjiga-fastfood.png',
            tags: ['Fast Food', 'Quick Bites'],
            categoryId: categories[1]._id,
            featured: false
        });

        console.log('Restaurants seeded...');

        // Menu Items for Hamaressa Hotel
        await MenuItem.insertMany([
            {
                name: 'Tibs (ጥብስ)',
                description: 'Sautéed beef or lamb with vegetables and spices',
                price: 500,
                image: '/images/tibs.png',
                restaurant: hamaressa._id,
                category: 'Ethiopian',
                featured: true
            },
            {
                name: 'Kitfo (ክትፎ)',
                description: 'Minced raw beef, seasoned with mitmita and butter',
                price: 560,
                image: '/images/kitfo.png',
                restaurant: hamaressa._id,
                category: 'Ethiopian',
                featured: true
            },
            {
                name: 'Doro Wot (ዶሮ ወጥ)',
                description: 'Spicy chicken stew with hard-boiled eggs',
                price: 440,
                image: '/images/doro-wot.png',
                restaurant: hamaressa._id,
                category: 'Ethiopian',
                featured: false
            },
            {
                name: 'Beyaynetu (በያይነቱ)',
                description: 'Vegetarian platter with assorted dishes',
                price: 360,
                image: '/images/beyaynetu.png',
                restaurant: hamaressa._id,
                category: 'Ethiopian',
                featured: false
            }
        ]);

        // Menu Items for Jigjiga Cafe
        await MenuItem.insertMany([
            {
                name: 'Macchiato',
                description: 'Ethiopian-style espresso macchiato',
                price: 70,
                image: '/images/macchiato.png',
                restaurant: jijigaCafe._id,
                category: 'Coffee',
                featured: true
            },
            {
                name: 'Sambusa',
                description: 'Crispy pastry filled with lentils or meat',
                price: 30,
                image: '/images/sambusa.png',
                restaurant: jijigaCafe._id,
                category: 'Snacks',
                featured: true
            },
            {
                name: 'Fresh Juice',
                description: 'Avocado, mango, or mixed fruit juice',
                price: 90,
                image: '/images/juice.png',
                restaurant: jijigaCafe._id,
                category: 'Beverages',
                featured: false
            },
            {
                name: 'Croissant',
                description: 'Buttery, flaky croissant',
                price: 50,
                image: '/images/croissant.png',
                restaurant: jijigaCafe._id,
                category: 'Bakery',
                featured: false
            }
        ]);

        // Menu Items for Sumale Restaurant
        await MenuItem.insertMany([
            {
                name: 'Bariis (Rice)',
                description: 'Fragrant Somali-style rice with meat',
                price: 300,
                image: '/images/bariis.png',
                restaurant: sumaleRestaurant._id,
                category: 'Traditional',
                featured: true
            },
            {
                name: 'Suqaar',
                description: 'Diced meat with vegetables and spices',
                price: 360,
                image: '/images/suqaar.png',
                restaurant: sumaleRestaurant._id,
                category: 'Traditional',
                featured: true
            },
            {
                name: 'Canjeero (Lahoh)',
                description: 'Somali pancake served with stew',
                price: 160,
                image: '/images/canjeero.png',
                restaurant: sumaleRestaurant._id,
                category: 'Breakfast',
                featured: false
            },
            {
                name: 'Maraq (Soup)',
                description: 'Traditional Somali soup with vegetables',
                price: 200,
                image: '/images/maraq.png',
                restaurant: sumaleRestaurant._id,
                category: 'Soup',
                featured: false
            }
        ]);

        // Menu Items for Karamarda Hotel
        await MenuItem.insertMany([
            {
                name: 'Firfir (ፍርፍር)',
                description: 'Shredded injera mixed with spicy sauce',
                price: 240,
                image: '/images/firfir.png',
                restaurant: karamardaHotel._id,
                category: 'Breakfast',
                featured: true
            },
            {
                name: 'Shiro (ሽሮ)',
                description: 'Chickpea stew with spices',
                price: 180,
                image: '/images/shiro.png',
                restaurant: karamardaHotel._id,
                category: 'Ethiopian',
                featured: false
            },
            {
                name: 'Gomen (ጎመን)',
                description: 'Collard greens with spices',
                price: 160,
                image: '/images/gomen.png',
                restaurant: karamardaHotel._id,
                category: 'Ethiopian',
                featured: false
            }
        ]);

        // Menu Items for Green Cafe
        await MenuItem.insertMany([
            {
                name: 'Avocado Juice',
                description: 'Fresh avocado blended with milk and sugar',
                price: 100,
                image: '/images/avocado-juice.png',
                restaurant: greenCafe._id,
                category: 'Beverages',
                featured: true
            },
            {
                name: 'Fruit Salad',
                description: 'Fresh mixed fruits',
                price: 120,
                image: '/images/fruit-salad.png',
                restaurant: greenCafe._id,
                category: 'Dessert',
                featured: false
            }
        ]);

        // Menu Items for Jigjiga Fast Food
        await MenuItem.insertMany([
            {
                name: 'Burger',
                description: 'Beef burger with fries',
                price: 240,
                image: '/images/burger.png',
                restaurant: fastFoodJigjiga._id,
                category: 'Fast Food',
                featured: true
            },
            {
                name: 'Fried Chicken',
                description: 'Crispy fried chicken pieces',
                price: 280,
                image: '/images/fried-chicken.png',
                restaurant: fastFoodJigjiga._id,
                category: 'Fast Food',
                featured: false
            },
            {
                name: 'Pizza Slice',
                description: 'Fresh pizza slice',
                price: 160,
                image: '/images/pizza-slice.png',
                restaurant: fastFoodJigjiga._id,
                category: 'Fast Food',
                featured: false
            }
        ]);

        console.log('Menu Items seeded...');
        console.log('✅ Database seeded with Jigjiga restaurants and menu items!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
