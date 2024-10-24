const userService = require("../service/userService");

const userController = {

create: async (req,res) =>{
    try {
        const user = await userService.create(req.body);
        return res.status(201).json({
            msg: "Usuario criado com sucesso",
            user
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Erro ao tentar criar um usuario"
        })
    }
},
update: async(req,res) =>{
    try {
        const user = await userService.update(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({
                msg: 'User não econtrado',
            })
        }
        return res.status(200).json({
            msg: "Usuario Atualizado com sucesso",
            user
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Erro ao atualizar o User"
        })
    }
},

getAll: async (req, res) =>{
    try {
        const users = await userService.getAll();
        return res.status(200).json({
            msg: "Todos os Usuarios",
            users
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Ocorreu um erro no Servidor"
        })
    }
},

getOne: async (req, res) =>{
    try {
        const user = await userService.getById(req.params.id);
       if (!user) {
        return res.status(400).json({
            msg: "usuario não econtrado",
        })
       }
       return res.status(200).json({
        msg: "Usuario Encontradix",
        user
    }); v   
    } catch (error) {
        return res.status(500).json({
            msg:"Ocorreu um erro no Servidor"
        })
    }
}, 
delete: async (req, res) =>{
    try {
        const user = await userService.delete(req.params.id);
        if (!user) {
            return res.status(400).json({
                msg: "Usuario não Econtrado"
            });
        }
        return res.status(200).json({
           msg: "Usuario deletado com sucesso!"     
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Ocorreu um erro no Servidor"
        })
    }
}



}
module.exports = userController;