const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "../images");

// ensure folder exists
try {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("🗂️ 'images' folder created at:", uploadPath);
  } else {
    console.log("🗂️ 'images' folder already exists at:", uploadPath);
  }
} catch (err) {
  console.error("❌ Error creating images folder:", err);
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });
module.exports = upload;
