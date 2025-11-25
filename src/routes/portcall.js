const express = require('express');
const router = express.Router();

const ctrl = require('../controller/portcallController');

router.get('/', ctrl.getPortcallController);

module.exports = router;
