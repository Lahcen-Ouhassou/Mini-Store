const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // نقرأ المتغيرات من .env

connectDB(); // نربط مع MongoDB

const app = express();
// Middleware باش نفهم JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server & MongoDB are Running ✅"));

const userRouter = require("./routes/userRoutes");
app.use("/api/v1/users", userRouter);

const productRouter = require("./routes/productRoutes");
app.use("/api/v1/products", productRouter);

app.use("/uploads", express.static("uploads"));

const orderRouter = require("./routes/orderRoutes");
app.use("/api/v1/orders", orderRouter);

const cartRouter = require("./routes/cartRoutes");
app.use("/api/v1/cart", cartRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
