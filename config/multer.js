// // middleware/upload.js
// // const multer = require("multer");
// import multer from "multer";
// // const path = require("path");

// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // yaha file save hogi
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique name
//   },
// });

// const upload = multer({ storage });

// export default upload;


import multer from "multer";

// Ab file ko disk pe save nahi karenge, memory me buffer store hoga
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // max 50MB limit
  },
});

export default upload;
