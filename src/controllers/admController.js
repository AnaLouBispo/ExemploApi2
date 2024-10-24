const admService = require("../service/admService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adm = require("../models/admin");

const admController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const admin = await adm.findOne({ where: { email } });

      if (!admin) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }
      const isValid = await bcrypt.compare(senha, admin.senha);
      if (!isValid) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const token = jwt.sign(
        {
          email: admin.email,
          nome: admin.nome,
        },
        process.env.SECRET,
        { expiresIn: "1hr" }
      );

      return res.status(200).json({
        msg: "Login realizado!",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Acione o Suporte",
      });
    }
  },
  create: async (req, res) => {
    try {
      const { nome, senha, email } = req.body;

      const hashSenha = await bcrypt.hash(senha, 10);

      const adminCriado = await admService.create({
        nome,
        senha: hashSenha,
        email,
      });

      return res.status(200).json({
        msg: "Admin criado com sucesso!",
        adm: adminCriado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },

  update: async (req, res) => {
    try {
      const adm = await admService.update(req.params.id, req.body);
      if (!adm) {
        return res.status(400).json({
          msg: "Adm não econtrado",
        });
      }
      return res.status(200).json({
        msg: "Adm Atualizado com sucesso",
        adm,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao atualizar o User",
      });
    }
  },

  updateSenha: async (req, res) => {
    const { id } = req.params;
    const { senha } = req.body;
    console.log(senha);

    try {
      const senhaUpadte = await adm.findByPk(id);
      if (senhaUpadte == null) {
        return res.status(404).json({
          msg: "Admin não encontrado",
        });
      }
      const hashSenha = await bcrypt.hash(senha, 10);
      const upadate = await senhaUpadte.update({
        senha:hashSenha
      });

      

      if (upadate) {
        return res.status(200).json({
          msg: "Senha atualizada com sucesso",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },

  getAll: async (req, res) => {
    try {
      const adms = await admService.getAll();
      return res.status(200).json({
        msg: "Todos os Usuarios",
        adms,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no Servidor",
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const adm = await admService.getById(req.params.id);
      if (!adm) {
        return res.status(400).json({
          msg: "Adm não econtrado",
        });
      }
      return res.status(200).json({
        msg: "Adm Encontradix",
        adm,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no Servidor",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const adm = await admService.delete(req.params.id);
      if (!adm) {
        return res.status(400).json({
          msg: "Adm não Econtrado",
        });
      }
      return res.status(200).json({
        msg: "Adm deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no Servidor",
      });
    }
  },
};
module.exports = admController;
