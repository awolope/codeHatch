import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function for direct uploads
export async function uploadToCloudinary(fileBuffer, originalName, folder = 'techlyn-academy') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'mp4', 'mov', 'avi'],
        resource_type: 'auto',
        public_id: `${originalName.split('.')[0]}_${Date.now()}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    uploadStream.end(fileBuffer);
  });
}

// Delete from Cloudinary
export async function deleteFromCloudinary(publicId) {
  return cloudinaryV2.uploader.destroy(publicId);
}

export { cloudinaryV2 as cloudinary };