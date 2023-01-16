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
    
    try {
        const objects = await s3
        .listObjectsV2({
            Bucket: bucketName,
            // Opts:
            // ContinuationToken: 'STRING_VALUE',
            // Delimiter: 'product-images',
            // EncodingType: url,
            // ExpectedBucketOwner: 'STRING_VALUE',
            // FetchOwner: true || false,
            // MaxKeys: 'NUMBER_VALUE',
            // Prefix: 'STRING_VALUE',
            // RequestPayer: requester,
            // StartAfter: 'STRING_VALUE'
        })
        .promise();
        return objects; 
    }
    catch(err) {
        console.log(err);
        return false
    };
};

export default defineEventHandler (async event => {
    
    let allImageData = await listObjectsInBucket(process.env.AWS_S3_IMAGE_BUCKET_NAME);
    
    return allImageData ? { status: '200', imageData: allImageData.Contents } :
        {status: '500', error: 'Unknown error retrieving images'};
}); 

// Response with images
// {
    // IsTruncated: false,
//     Contents: [
//       {
//         Key: 'product-image-2.jpg',
//         LastModified: 2023-01-14T17:10:59.000Z,
//         ETag: '"047d1139d4f0032549317edaaa5c0dd6"',
//         ChecksumAlgorithm: [],
//         Size: 184689,
//         StorageClass: 'STANDARD'
//       },
//       {
//         Key: 'product-image-3.jpg',
//         LastModified: 2023-01-14T17:10:59.000Z,
//         ETag: '"4d510f726caf14877ef89f7418f589b8"',
//         ChecksumAlgorithm: [],
//         Size: 56409,
//         StorageClass: 'STANDARD'
//       },
//     ],
//     Name: 'rvs-images',
//     Prefix: '',
//     MaxKeys: 1000,
//     CommonPrefixes: [],
//     KeyCount: 2
//   }
  