const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// يتأكد واش المستخدم عندو token JWT صالحة (يعني مسجل الدخول).
const protect = async (req, res, next) => {
  let token;

  // كيتحقق واش كاين header فيه "Authorization" وكيبدأ بـ "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // استخراج التوكن من الـ header

      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // يتحقق من التوكن باستعمال jwt.verify()

      // جلب المستخدم من قاعدة البيانات باستعمال id اللي داخل التوكن
      // وكنستبعد الباسوورد باش ما نرجعوش فـ req.user

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// "role = "admin" admin عندو الدور protect هاد الميدلواير كيتأكد واش المستخدم اللي جا من
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only!" });
  }
};

module.exports = { protect, adminOnly };
