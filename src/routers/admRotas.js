const { Router } = require('express');
const admController = require('../controllers/admController')
const router = Router();

 
router.post('/', admController.create );
router.put('/:id',  admController.update );
router.delete('/:id', admController.delete );
router.get('/:id',admController.getOne );
router.get('/', admController.getAll );
 
module.exports = router;
 
 
