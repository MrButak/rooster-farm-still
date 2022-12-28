import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_Secret_Key
});

let s3 = new AWS.S3();

const deleteObjectsInBucket = async (bucketName, bucketParams) => {
    try {
            const data = await s3Client.send(new DeleteObjectsCommand(bucketParams));
            return data; // For unit tests.
            console.log("Success. Object deleted.");
        }
        catch (err) {
            console.log("Error", err);
        };
    // var params = {
    // Bucket: bucketName, 
    // Key: "HappyFace.jpg"
    // };
    // s3.deleteObject(params, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else     console.log(data);           // successful response
    //     /*
    //     data = {
    //     }
    //     */
    // });


    // import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
    // import { s3Client } from "./libs/s3Client.js" // Helper function that creates an Amazon S3 service client module.

   
};


export default defineEventHandler (async event => {
    
    const bucketParams = {
        Bucket: "BUCKET_NAME",
        Delete: {
            Objects: [
                {
                    Key: "KEY_1",
                },
                {
                    Key: "KEY_2",
                },
            ],
        },
    };
    // let allImageData = await deleteObjectsInBucket(process.env.AWS_S3_IMAGE_BUCKET_NAME);
    // return { status: 200, imageData: allImageData.Contents };
});
