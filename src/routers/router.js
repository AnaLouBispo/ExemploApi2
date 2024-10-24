const { Router } = require("express");
const userRoutes = require("./usuarioRotas");
const admRoutes = require("./admRotas")
const admController =  require('../controllers/admController')
const router = Router();

router.use('/user', userRoutes);
router.use('/adm', admRoutes)
router.use('/login', (req, res)=>{
    admController.login(req, res)
}),
router.put('/UpSenha/:id', (req,res) => {
    admController.updateSenha(req, res)
});
module.exports = router;