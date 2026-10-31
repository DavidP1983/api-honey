import dotenv from 'dotenv';
dotenv.config();

const CLOUDINARY_BASE_URL = process.env.CLOUDINARY_BASE_URL;

export const getImageUrl = (image, width) => {
    if (!image?.publicId || !image?.format) {
        return null;
    }

    const transformations = ['f_jpg', 'q_auto'];

    if (width) {
        transformations.push(`w_${width}`);
    }

    return `${CLOUDINARY_BASE_URL}/${transformations.join(',')}/${image.publicId}.jpg`;
};
