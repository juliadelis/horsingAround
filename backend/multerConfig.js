import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';



export const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, path.resolve("images"));
    },
    filename: (req, file, callback) =>{
        const id = uuidv4();

        callback(null, `${id}_${file.originalname}`)
    }
});