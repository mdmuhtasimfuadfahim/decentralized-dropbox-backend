const express = require('express');
const validate = require('../../middlewares/validate');
const ipfsValidation = require('../../validations/ipfs.validation');
const ipfsController = require('../../controllers/ipfs.controller');

const router = express.Router();

router.post('/file', validate(ipfsValidation.uploadIpfsFile), ipfsController.uploadIpfsFile);
router.get('/file', ipfsController.getAllUploads);

module.exports = router;