const httpStatus = require('http-status');
const Moralis = require('moralis').default;
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const emailService = require('./email.service');

const uploadIpfsFile = async (reqFile, reqBody) =>{
  const fileBase64 = reqFile.file.buffer.toString("base64");

  try {
    const abi = [{
        path: `moralis/${reqFile.file.originalname}`,
        content: `${fileBase64}`,
    }];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });
    const metadata = {
      name: reqBody.name,
      email: reqBody.email,
      description: reqBody.description,
      uploadedFile: response.data[0].path
    };
    await emailService.sendEmail(metadata.email, 'Decentralized Dropbox Email By Muhtasim', `Your file has been uploaded to ipfs. Here it is ${metadata.uploadedFile}`);
    return { metadata, response };
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};


// I am not using any Monster DB in this branch
// So no need of this function

// const getAllUploads = async () => {
//   try {
//     const Monster = Moralis.Object.extend(`${config.moralisDatabase}`);
//     const query = new Moralis.Query(Monster);
//     const results = await query.find();
//     return results;
//   } catch (error) {
//     throw new ApiError(httpStatus.NO_CONTENT, 'Cannot upload your file to ipfs', error);
//   }
// }

module.exports = {
  uploadIpfsFile,
  // getAllUploads
};