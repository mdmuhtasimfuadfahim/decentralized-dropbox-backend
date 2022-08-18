const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ipfsService, uploadService } = require('../services');
const { success, error } = require('../utils/ApiResponse');

const uploadIpfsFile = catchAsync(async (req, res) => {
    uploadService.upload(req, res, async (err) =>{
    if(err){
      console.log(err);
      res.status(httpStatus.BAD_REQUEST).send(err);
    }
    else {
      const file = await ipfsService.uploadIpfsFile(req, req.body);
      if (!file) {
        res.status(httpStatus.CREATED).send(error('Something went wrong'));
      }
      res.status(httpStatus.CREATED).send(success(file, 'Your file has been uploaded to ipfs'));
    }
  })
});

const getAllUploads = catchAsync(async (req, res) => {
  const file = await ipfsService.getAllUploads();
  if (!file) {
    res.status(httpStatus.CREATED).send(error('Something went wrong'));
  }
  res.status(httpStatus.CREATED).send(success(file, 'Your file has been uploaded to ipfs'));
});

module.exports = {
  uploadIpfsFile,
  getAllUploads
};
