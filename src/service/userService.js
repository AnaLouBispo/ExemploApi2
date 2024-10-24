const User = require("../models/user");

const userService = {
  create: async (user) => {
    try {
      return await User.create(user);
    } catch (error) {
      throw new Error("ocorreu um erro ao criar o Usuario");
    }
  },

  update: async (id, userToupade) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      await user.update(userToupade);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Ocorreu um erro ao atualizar o user");
    }
  },

  getById: async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar o usuário");
    }
  },

  getAll: async() =>{
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error('Ocorreu um erro ao buscar todos!')
    }
  },
  delete: async(id)=>{
    try {
        const user = await User.findByPk(id);
        if(!user){
            return null
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error ('Ocorreu um erro ao deletar o User');
    }
  }


};
module.exports = userService;
