import AWS from 'aws-sdk';
import dotenv from "dotenv";
import fsPkg from 'fs';
import multerPkg from 'multer';
const { fs } = fsPkg;
const { upload } = multerPkg({ dest: 'uploads/' });
dotenv.config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_Secret_Key
});

let s3 = new AWS.S3();

async function uploadFile(fileName, fileKey) {
    return new Promise(async function(resolve, reject) {
        const params = {
            Bucket: process.env.AWS_S3_IMAGE_BUCKET_NAME, // pass your bucket name
            Key: fileKey,
            ACL: 'public-read',
            Body: fileSystem.createReadStream(fileName.path),
            ContentType: fileName.type
        };
    
        await s3.upload(params, function(s3Err, data) {
            if (s3Err){
                reject(s3Err);
            }
            console .log(`File uploaded successfully at ${data.Location}`);
            resolve(data.Location);
        });
    });
}
    
// var uploadFilePromises = [];

// var cpUpload = upload.fields([{ name:'screenShots', maxCount:1 },{ name:'apk', maxCount:1 }]);

// var apkFileKey = 'apk';
// uploadFilePromises.push(uploadFile(apk[0], apkFileKey));
// var screenShotFileKey = 'screenShot';
// uploadFilePromises.push(uploadFile(screenShot[0], screenShotFileKey));

// Promise.all(uploadFilePromises).then(async (values) => {
//     console.log(values);
//     }, 
//     reason => {
//     console.log(reason);    
// });
    
    

export default defineEventHandler (async event => {
    
    const body = await useBody(event)
    console.log(body.imageArray)
    

    return {status: '200'};
});
