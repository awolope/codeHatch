// lib/cloudinaryHelpers.js
import cloudinary from './cloudinary';

// Delete file from Cloudinary
export const deleteCloudinaryFile = async (url) => {
  try {
    if (!url) return;

    // Extract public_id from Cloudinary URL
    const publicId = url.split('/').pop().split('.')[0];
    const fullPublicId = `techlyn-academy/content/${publicId}`;

    const result = await cloudinary.uploader.destroy(fullPublicId);
    return result;
  } catch (error) {
    
    throw error;
  }
};

// Get file information from Cloudinary
export const getFileInfo = async (url) => {
  try {
    if (!url) return null;

    // Extract public_id from Cloudinary URL
    const publicId = url.split('/').pop().split('.')[0];
    const fullPublicId = `techlyn-academy/content/${publicId}`;

    const result = await cloudinary.api.resource(fullPublicId);
    return result;
  } catch (error) {
   
    return null;
  }
};