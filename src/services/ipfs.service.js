const httpStatus = require('http-status');
const Moralis = require('moralis/node');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const emailService = require('./email.service');

const uploadIpfsFile = async (reqFile, reqBody) =>{
  const value = reqFile.file.mimetype.substring(reqFile.file.mimetype.lastIndexOf('/') + 1);
  const file = new Moralis.File(`decentralized_file.${value}`, {base64 : reqFile.file.buffer.toString("base64")});

  const Monster = Moralis.Object.extend(`${config.moralisDatabase}`);
  const monster = new Monster();

  try {
    await file.saveIPFS({useMasterKey: true});
    let fileURI = file.ipfs();
    const metadata = {
      name: reqBody.name,
      email: reqBody.email,
      description: reqBody.description,
      uploadedFile: fileURI
    };

    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS({useMasterKey: true});
    const metadataURI = metadataFile.ipfs();

    monster.set("email", metadata.email);
    monster.set("name", metadata.name);
    monster.set("description", metadata.description);
    monster.set("file", metadata.uploadedFile);
    monster.set("metadata", metadataURI);
    monster.set("canFly", true);
    await monster.save();
    await emailService.sendEmail(metadata.email, 'Decentralized Dropbox Email By Muhtasim', `Your file has been uploaded to ipfs. You can find it at ${metadata.uploadedFile}`);
    return { metadata, fileURI };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot upload your file to ipfs', error);
  }
};

const getAllUploads = async () => {
  try {
    const Monster = Moralis.Object.extend(`${config.moralisDatabase}`);
    const query = new Moralis.Query(Monster);
    const results = await query.find();
    return results;
  } catch (error) {
    throw new ApiError(httpStatus.NO_CONTENT, 'Cannot upload your file to ipfs', error);
  }
}

module.exports = {
  uploadIpfsFile,
  getAllUploads
};