import { v4 as uuidv4 } from 'uuid';
import cloudinary from "cloudinary" ;
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.v2.config({
    cloud_name: "dgjpw8ei8",
    api_key: "484168461239214",
    api_secret: "-y0peY1ZmF4Ci5B5JdCdOK96q1U"
});

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: "images",
    },
  });