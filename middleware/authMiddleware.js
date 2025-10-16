const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware للتحقق من JWT
const protect = async (req, res, next) => {
  try {
    let token;

    // نتحقق واش كاين Authorization header وكيبدأ بـ "Bearer"
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith("Bearer")
    ) {
      // نأخذ التوكن من الـ header
      token = req.headers.authorization.split(" ")[1]; //نقطع Bearer وناخذ token فقط

      // نتحقق من التوكن باستعمال السر JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // نلقاو المستخدم ديال داك التوكن
      req.user = await User.findById(decoded.id).select("-password");

      next(); // نكمل العملية (نكمل للـ route)
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = protect;
