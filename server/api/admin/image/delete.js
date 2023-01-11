import AWS from 'aws-sdk';
import { deleteImage, deleteImagesFromProducts } from '~~/services/dbManager';
import dotenv from "dotenv";
dotenv.config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_Secret_Key
});

let s3 = new AWS.S3();

// Function returns a promise to delete an image from S3 bucket
async function deleteObjectsInBucket(bucketParams) {
    let res = await s3.deleteObjects(bucketParams).promise()
    return res;
};

// DB call to delete image from image.file_name
async function deleteImagesFromDb(imageNameArray) {
	for(const imageName of imageNameArray) {
		await deleteImage(imageName.Key);
	}
};

// DB call to delete image name from products.image_names[]
async function deleteImageNameFromProduct(imageNameArray) {
    for(const imageName of imageNameArray) {
        await deleteImagesFromProducts(imageName.Key)
    };
};

export default defineEventHandler (async event => {
    
    const body = await useBody(event);
    const bucketParams = {
        Bucket: process.env.AWS_S3_IMAGE_BUCKET_NAME,
        Delete: {
            Objects: body.imageNameArray
        }
    };
    
    let response = await deleteObjectsInBucket(bucketParams);
    // TODO: 
    // 1 .Delete from images table in DB
    // 2. Delete image names from products table image_names[] column
    if(!response.Errors.length) {
            console.log(response.Deleted)
            console.log('***************')
			await deleteImagesFromDb(response.Deleted);
			await deleteImageNameFromProduct(response.Deleted)
			return {status: '200', data: response.Deleted}
            
		}

    return {status: '500', data: response.Errors};
}); 
