const { Router } = require('express');
const userController = require('../controllers/userController')
const router = Router();
const {validateUser, validateUserId} = require('../middlewares/validateUser');
 
router.post('/', validateUser, userController.create );
router.put('/:id', validateUser, validateUserId, userController.update );
router.delete('/:id', validateUser, validateUserId, userController.delete );
router.get('/:id', validateUser, validateUserId,userController.getOne );
router.get('/', validateUser, userController.getAll );
 
module.exports = router;
 
 
