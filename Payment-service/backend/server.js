const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

let otpStore = {}; // To store OTPs temporarily

// Email setup for sending OTP
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service (e.g., SMTP)
  auth: {
    user: "devoops225359@gmail.com", // Your email
    pass: "uajz udgq vrtp hzuu", // Your email password
  },
});

// Function to get user email from the user microservice
const getUserEmail = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:80/user/${userId}`);
    return response.data.email; // Assuming the user microservice returns an object with an 'email' field
  } catch (error) {
    console.error("Error fetching user email:", error);
    throw new Error("Failed to fetch user email");
  }
};

// Step 1: Initiate Payment and Send OTP
app.post("/initiate-payment", async (req, res) => {
  const {userId,bookingId } = req.body;

  try {
    // Get user email from the user microservice
    const email = await getUserEmail(userId);

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "User email not found",
      });
    }

    // Generate a random OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with a short expiry
    otpStore[userId] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP valid for 5 minutes

    // Send OTP via email
    const mailOptions = {
      from: "devoops225359@gmail.com",
      to: email,
      subject: "Your OTP for Payment Verification",
      text: `Your OTP for booking ${bookingId} is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "OTP sent to your email. Please verify to proceed.",
    });
  } 
  catch (error) {
    console.error("Error during payment initiation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate payment. Please try again.",
    });
  }
}
);

// Step 2: Verify OTP and Process Payment
app.post("/verify-otp-and-process-payment", async (req, res) => {
  const { userId, amount, bookingId, otp } = req.body;

  const storedOtpData = otpStore[userId];

  if (!storedOtpData) {
    return res.status(400).json({
      success: false,
      message: "OTP not found or expired. Please initiate payment again.",
    });
  }

  // Check if OTP is valid
  if (Date.now() > storedOtpData.expiresAt) {
    return res.status(400).json({
      success: false,
      message: "OTP has expired. Please initiate payment again.",
    });
  }

  if (storedOtpData.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP. Please try again.",
    });
  }

  // OTP is valid, proceed with payment
  const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success

  if (isPaymentSuccessful) {
    // Mock a successful payment response
    const transactionId = `txn_${Math.floor(Math.random() * 1000000)}`;

    // Notify booking service of the successful payment
    try {
      await axios.post("http://localhost:4001/booking/update-payment-status", {
        bookingId,
        status: "success",
        transactionId,
      });

      // Clear OTP after successful payment
      delete otpStore[userId];

      res.json({
        success: true,
        message: "Payment processed successfully",
        transactionId,
        bookingId,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Payment processed, but failed to update booking service",
      });
    }
  } else {
    // Mock a failed payment response
    try {
      await axios.post("http://localhost:4001/booking/update-payment-status", {
        bookingId,
        status: "failure",
      });

      res.status(400).json({
        success: false,
        message: "Payment failed. Please try again.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Payment failed and booking service update failed.",
      });
    }
  }
});

app.listen(4002, () => {
  console.log("Payment service running on port 4002");
});
