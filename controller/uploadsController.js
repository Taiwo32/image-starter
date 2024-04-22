const path = require("path");
const AppError = require("../utils/appError");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.uploadProductImageLocal = async (req, res, next) => {
  if(!req.files){
    return next(new AppError('No file Uploaded',400));
  }
  const productImage = req.files.image
  if(!productImage.mimetype.startsWith("image")) {     //mim is use to validate the type files being uploaded and processing them accordingly
    return next (new AppError("please Upload image", 400))
  }
  const maxSize = 1024 * 1024 + 20
  if (productImage > maxSize){
    return next (new AppError('please upload image less than 20kb', 400)); 
  }        
  const imagePath = path.join(
    __dirname,
    "./../public/upload" + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  res.status(201).json({image: {src: `/uploads/${productImage.name}`}});
};
//for storing in cloudinary
exports.uploadProductImageCloud = async (req,res)=>{
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  // to remove temp files 
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(200).json({image: {src: result.secure_url}});
};
