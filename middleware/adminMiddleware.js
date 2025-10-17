// هاد middleware هو اللي كيتأكد واش المستخدم عندو role = admin
// باش يخليه يدير عمليات خاصة (مثلاً create product أو delete)

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // ✅ عندو صلاحية admin
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = admin;
