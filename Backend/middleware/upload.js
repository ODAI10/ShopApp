const multer = require('multer');
const path = require('path');

 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/ImgProducts/');  
  },
  filename: (req, file, cb) => {
     cb(null, Date.now() + path.extname(file.originalname));
  }
});

 const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  
  fileFilter: (req, file, cb) => {
     const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only images are allowed!');
    }
  }
}).single('image'); 

module.exports = upload;
