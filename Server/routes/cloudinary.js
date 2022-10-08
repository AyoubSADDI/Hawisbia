const cloudinary = require('cloudinary');
const dotenv=require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: "hawesbeya",
    api_key: "277761748583316",
    api_secret: "hHHSUer8A3wMz1zSJlyQ_IszRfY"
  });

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}