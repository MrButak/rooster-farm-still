import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_Secret_Key
});

function addPhoto(imgObj) {
    
    var file = imgObj.data;
    var fileName = imgObj.name;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_S3_IMAGE_BUCKET_NAME,
            Key: fileName,
            Body: Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64'),
            ContentEncoding: 'base64',
        }
    });

    return upload.promise();
};

export default defineEventHandler (async event => {
    
    const body = await useBody(event);

    // Build an Array of promises: to upload the image
    let uploadPromiseArray = [];
    Object.values(body.imageData).forEach((imageData, index) => {
        uploadPromiseArray.push(addPhoto({data: imageData, name: body.imageNameArray[index]}));
    });

    // Promise.all(uploadPromiseArray).then((values) => {
    //     console.log(values)
    // });
    Promise.all(uploadPromiseArray)
    
    return {status: '200'};
});
