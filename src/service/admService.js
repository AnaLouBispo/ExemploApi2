const Admin = require("../models/admin");

const admService = {
  create: async (admin) => {
    try {
      return await Admin.create(admin);
    } catch (error) {
      throw new Error("Ocorreu um erro ao criar Admin");
    }
  },
  update: async (id, userToupade) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {   
        return null;
      }
      await admin.update(userToupade);
      await admin.save();
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao atualizar o adm");
    }
  },

  getById: async (id) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar o adm");
    }
  },

  getAll: async () => {
    try {
      return await Admin.findAll();
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar todos!");
    }
  },
  delete: async (id) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      await admin.destroy();
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao deletar o Adm");
    }
  },
};
module.exports = admService;
