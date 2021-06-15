const express = require('express');

const router = express.Router();
const controller = require('../Mods/controller');
/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString()
	});
});

router.post('/get_pause_setting', controller.getPauseSetting);
router.post('/get_setting', controller.getSetting);
router.post('/set_pause_setting', controller.setPauseSetting);
router.post('/set_setting', controller.setSetting);
router.post('/get_transactions', controller.getTransactions);

module.exports = router;
