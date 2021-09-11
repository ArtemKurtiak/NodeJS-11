const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v4;

const {
    AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME
} = require('../constants/constants');

const S3Bucket = new S3({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
});

module.exports = {
    uploadLaptopPhoto: (file, type, id) => {
        const { name, data, mimetype } = file;

        const fileUploadPath = buildFilePath(name, type, id.toString());

        return S3Bucket.upload({
            Bucket: AWS_BUCKET_NAME,
            Key: fileUploadPath,
            Body: data,
            ContentType: mimetype
        }).promise();
    }
};

function buildFilePath(file, type, id) {
    const fileExt = path.extname(file);

    const filePath = path.join(type, id, `${uuid()}${fileExt}`).replace(/\\/g, '/');

    return filePath;
}
