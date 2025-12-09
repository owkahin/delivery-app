const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

// @route   POST api/orders
// @desc    Create a delivery order
// @access  Private
router.post('/', auth, createOrder);

// @route   GET api/orders
// @desc    Get all orders for user
// @access  Private
router.get('/', auth, getOrders);

// @route   GET api/orders/:id
// @desc    Get order status
// @access  Private
router.get('/:id', auth, getOrder);

// @route   PATCH api/orders/:id
// @desc    Update order status
// @access  Private
router.patch('/:id', auth, updateOrder);

module.exports = router;
