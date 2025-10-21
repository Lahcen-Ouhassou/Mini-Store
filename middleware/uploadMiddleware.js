const multer = require("multer");
const path = require("path");

// تحديد المكان اللي غادي تتحفظ فيه الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 📁 غادي نحطو الصور فـ مجلد اسمو "uploads"
  },
  filename: function (req, file, cb) {
    // نولّيو نسميو كل ملف بوقت الرفع + الاسم الأصلي باش مايتكرروش
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
    );
  },
});

// نتحقق من نوع الملف (غير الصور)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only images are allowed!"));
  }
};

// إنشاء middleware multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
});

module.exports = upload;
