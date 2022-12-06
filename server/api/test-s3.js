import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

//configuring the AWS environment
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
    
    let allImageData = await listObjectsInBucket(AWS_S3_IMAGE_BUCKET_NAME);
    
    return { status: 200, imageData: allImageData };
});




// // A utility function to create HTML.
// function getHtml(template) {
//   return template.join("\n");
// }
// // Make the getHTML function available to the browser
// window.getHTML = getHtml;

// // List the photo albums that exist in the bucket
// const albumBucketName = "BUCKET_NAME"; //BUCKET_NAME

// const listAlbums = async () => {
//   try {
//     const data = await s3.send(
//       new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName })
//     );
//     const albums = data.CommonPrefixes.map(function (commonPrefix) {
//       const prefix = commonPrefix.Prefix;
//       const albumName = decodeURIComponent(prefix.replace("/", ""));
//       return getHtml([
//         "<li>",
//         '<button style="margin:5px;" onclick="viewAlbum(\'' +
//           albumName +
//           "')\">",
//         albumName,
//         "</button>",
//         "</li>",
//       ]);
//     });
//     const message = albums.length
//       ? getHtml(["<p>Click an album name to view it.</p>"])
//       : "<p>You don't have any albums. You need to create an album.";
//     const htmlTemplate = [
//       "<h2>Albums</h2>",
//       message,
//       "<ul>",
//       getHtml(albums),
//       "</ul>",
//     ];
//     document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
//   } catch (err) {
//     return alert("There was an error listing your albums: " + err.message);
//   }
// };
// // Make the viewAlbum function available to the browser
// window.listAlbums = listAlbums;


// // Show the photos that exist in an album
// const viewAlbum = async (albumName) => {
//   try {
//     const albumPhotosKey = encodeURIComponent(albumName) + "/";
//     const data = await s3.send(
//       new ListObjectsCommand({
//         Prefix: albumPhotosKey,
//         Bucket: albumBucketName,
//       })
//     );
//     const href = "https://s3." + REGION + ".amazonaws.com/";
//     const bucketUrl = href + albumBucketName + "/";
//     const photos = data.Contents.map(function (photo) {
//       const photoKey = photo.Key;
//       const photoUrl = bucketUrl + encodeURIComponent(photoKey);
//       return getHtml([
//         "<span>",
//         "<div>",
//         "<br/>",
//         '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
//         "</div>",
//         "<div>",
//         "<span>",
//         photoKey.replace(albumPhotosKey, ""),
//         "</span>",
//         "</div>",
//         "</span>",
//       ]);
//     });
//     const message = photos.length
//       ? "<p>The following photos are present.</p>"
//       : "<p>There are no photos in this album.</p>";
//     const htmlTemplate = [
//       "<div>",
//       '<button onclick="listAlbums()">',
//       "Back To albums",
//       "</button>",
//       "</div>",
//       "<h2>",
//       "Album: " + albumName,
//       "</h2>",
//       message,
//       "<div>",
//       getHtml(photos),
//       "</div>",
//       "<h2>",
//       "End of album: " + albumName,
//       "</h2>",
//       "<div>",
//       '<button onclick="listAlbums()">',
//       "Back To albums",
//       "</button>",
//       "</div>",
//     ];
//     document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
//     document
//       .getElementsByTagName("img")[0]
//       .setAttribute("style", "display:none;");
//   } catch (err) {
//     return alert("There was an error viewing your album: " + err.message);
//   }
// };

// // Make the viewAlbum function available to the browser
// window.viewAlbum = viewAlbum;
