import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_Secret_Key
});

let s3 = new AWS.S3();

const listObjectsInBucket = async (bucketName) => {
    // Create the parameters for calling listObjects
    // const bucketParams = {
    //     Bucket : bucketName,
    // };
    
    const objects = await s3
        .listObjects({
            Bucket: bucketName
        })
        .promise();
    return objects;
};


export default defineEventHandler (async event => {
    
    // const body = await useBody(event)
    
    let allImageData = await listObjectsInBucket(process.env.AWS_S3_IMAGE_BUCKET_NAME);
    
    return { status: 200, imageData: allImageData.Contents };
});
