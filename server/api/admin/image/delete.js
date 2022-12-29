import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_Secret_Key
});

let s3 = new AWS.S3();

async function deleteObjectsInBucket(bucketParams) {
    
    let res = await s3.deleteObjects(bucketParams).promise()
    return res;
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
    return response.Errors.length ?
        {status: '500', data: response.Errors} :
        {status: '200', data: response.Deleted};
}); 
