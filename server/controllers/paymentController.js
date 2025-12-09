exports.processPayment = async (req, res) => {
  const { orderId, paymentMethod, amount } = req.body;

  // In a real application, you would integrate with a payment gateway like Stripe, Chapa, or eBirr.
  // For this MVP, we'll just simulate a successful payment.

  console.log(`Processing payment for order ${orderId} with ${paymentMethod} for amount ${amount}`);

  res.json({ msg: 'Payment successful' });
};
