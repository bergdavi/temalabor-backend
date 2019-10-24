const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const getUserDataMW = require('../middlewares/user/getUserData');
const getUserTicketsMW = require('../middlewares/user/getUserTickets');
const getOwnUserDataMW = require('../middlewares/user/getOwnUserData');
const deleteUserMW = require('../middlewares/user/deleteUser');
const updateUserDataMW = require('../middlewares/user/updateUserData');

router.get('/',
    checkUserLoginMW(),
    getOwnUserDataMW()
);

router.get('/:userId',
    checkUserLoginMW(),
    checkUserIdMW('self', 'inspector', 'admin'),
    getUserDataMW()
);

router.get('/:userId/tickets',
	checkUserLoginMW(),
	checkUserIdMW('self', 'inspector', 'admin'),
	getUserTicketsMW()
);

router.post('/:userId',
	checkUserLoginMW(),
	checkUserIdMW('self', 'admin'),
	updateUserDataMW()
);

router.delete('/:userId',
	checkUserLoginMW(),
    checkUserIdMW('self', 'admin'),
	deleteUserMW()
);

module.exports = router;
