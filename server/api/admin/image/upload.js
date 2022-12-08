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
  
    var promise = upload.promise();
  
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
      },
      function(err) {
        console.log('sdfldsjf;lsdjf;lkdsjf;ljds;lfkajds;lkfjs;')
        return console.log("There was an error uploading your photo: ", err.message);
      }
    );
  }
    
    

export default defineEventHandler (async event => {
    
    const body = await useBody(event)
    // console.log(body.imageData)
    // console.log(body.imageName)
    addPhoto({data: body.imageData, name: body.imageName})
    //uploadFilePromises.push(uploadFile(body.imageAray[0].name, body.imageAray[0].data));

    return {status: '200'};
});
