// import axios from 'axios';
// import imageCompression from 'browser-image-compression';

// const uploadToCloudinary = async (file, setUploadProgress, maxSizeKB = 800) => {
//   try {
//     const maxSizeMB = maxSizeKB / 1024;
//     const options = {
//       maxSizeMB: maxSizeMB,
//       useWebWorker: true,
//     };

//     const compressedFile = await imageCompression(file, options);

//     if (compressedFile.size / 1024 > maxSizeKB) {
//       throw new Error(`Unable to compress image to desired size. Current size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
//     }

//     const data = new FormData();
//     data.append("file", compressedFile);
//     data.append("upload_preset", "belivmart");
//     data.append("folder", "belivmart");

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/dd235lp9r/image/upload`, 
//       // `https://api.cloudinary.com/v1_1/dvjw9pm1d/image/upload`, 
//       data,
//       {
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           if (setUploadProgress) {
//             setUploadProgress(percentCompleted);
//           }
//         }
//       }
//     );

//     if (response.status === 200) {
//       return response.data.url;  
//     } else {
//       throw new Error('Failed to upload image');
//     }
//   } catch (error) {
//     console.error("Image upload error:", error);
//     throw error;
//   }
// };

// export default uploadToCloudinary;

import AWS from 'aws-sdk';
import imageCompression from 'browser-image-compression';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const uploadToS3 = async (file, setUploadProgress, maxSizeKB = 800) => {
  try {
    const maxSizeMB = maxSizeKB / 1024;
    const options = {
      maxSizeMB: maxSizeMB,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    if (compressedFile.size / 1024 > maxSizeKB) {
      throw new Error(`Unable to compress image to desired size. Current size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
    }

    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.name}`,
      Body: compressedFile,
      ContentType: file.type,
      ACL: 'public-read',
    };

    const upload = s3.upload(params);

    upload.on('httpUploadProgress', (progress) => {
      const percentCompleted = Math.round((progress.loaded * 100) / progress.total);
      if (setUploadProgress) {
        setUploadProgress(percentCompleted);
      }
    });

    const data = await upload.promise();
    return data.Location; // Returns the public URL of the uploaded file

  } catch (error) {
    console.error("S3 Image upload error:", error);
    throw error;
  }
};

export default uploadToS3;
