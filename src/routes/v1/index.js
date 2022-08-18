const express = require('express');
const ipfsRoute = require('./ipfs.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/ipfs',
    route: ipfsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
