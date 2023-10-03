// dependencies 
import multer from "multer";

// create diskstorge 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'thumbnail'){
            cb(null, 'public/uploads/product');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 1000000) + '_' + file.originalname);
    }
});

// create multer middlewares 
export const productImagesMulter = multer({storage}).single('thumbnail');