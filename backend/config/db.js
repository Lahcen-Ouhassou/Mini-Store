const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // هادي كتوقف التطبيق كامل إذا فشل الاتصال   ,process.exit(1) → معناها: الخروج بخطأ, process.exit(0) → معناها: الخروج بنجاح.
  }
};

module.exports = connectDB;
