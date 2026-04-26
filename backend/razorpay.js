const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your actual Razorpay test credentials
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_KEY_SECRET",
});

// Simple route to confirm backend is running
app.get("/", (req, res) => {
  res.send("Razorpay backend is running ✅");
});

// Route to create order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise (₹1 = 100 paise)
      currency: "INR",
      receipt: "receipt_order_" + Math.floor(Math.random() * 10000),
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpay.key_id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Razorpay server running on http://localhost:${PORT}`);
});
