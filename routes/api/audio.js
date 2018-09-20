const router = require('express').Router();
const audioController = require('../../controllers/audioController');


// Matches with '/api/audio'
router.route('/list').post(audioController.list);
router.route('/play').post(audioController.play);
router.route('/update').get(audioController.update);
module.exports = router;
