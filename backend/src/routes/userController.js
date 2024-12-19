// routes/routes.js
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const { generateToken, authenticateToken } = require("../auth/auth");

const router = express.Router();

// Registro de Usuários
router.post('/signup', async (req, res) => {
    try {
        // Criptografa a senha antes de armazenar
        const hashedPassword = await bcrypt.hash(req.body.user_pwd, 10);

        const userSql = "INSERT INTO TBUSER (user_nm, user_email, user_fn, user_pwd, user_cn, user_tp) VALUES (?, ?, ?, ?, ?, ?)";
        const userValues = [
            req.body.user_nm,
            req.body.user_email,
            req.body.user_fn,
            hashedPassword, // Senha criptografada
            req.body.user_cn,
            req.body.user_tp
        ];

        db.query(userSql, userValues, (err, userResult) => {
            if (err) {
                console.error("Erro ao registrar usuário:", err);
                return res.status(500).json({ error: "Erro ao registrar usuário" });
            }

            const userId = userResult.insertId;

            const addressSql = "INSERT INTO TBENDE (user_id, ende_log, ende_num, ende_comp, ende_cida, ende_uf, ende_cep, ende_brr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const addressValues = [
                userId,
                req.body.ende_log,
                req.body.ende_num || null,
                req.body.ende_comp || null,
                req.body.ende_cida,
                req.body.ende_uf,
                req.body.ende_cep,
                req.body.ende_brr
            ];

            db.query(addressSql, addressValues, (err) => {
                if (err) {
                    console.error("Erro ao registrar endereço:", err);
                    return res.status(500).json({ error: "Erro ao registrar endereço" });
                }

                return res.status(201).json({ message: "Usuário e endereço registrados com sucesso!" });
            });
        });
    } catch (err) {
        console.error("Erro ao criptografar a senha:", err);
        return res.status(500).json({ error: "Erro ao processar registro de usuário" });
    }
});

// Login de Usuários
router.post('/login', async (req, res) => {
    const sql = "SELECT * FROM TBUSER WHERE user_email = ?";

    db.query(sql, [req.body.user_email], async (err, data) => {
        if (err) {
            console.error("Erro ao autenticar usuário:", err);
            return res.status(500).json({ error: "Erro ao autenticar usuário" });
        }

        if (data.length > 0) {
            const user = data[0];

            // Compara a senha inserida com a senha criptografada
            const passwordMatch = await bcrypt.compare(req.body.user_pwd, user.USER_PWD);

            if (passwordMatch) {
                const token = generateToken(user);

                return res.status(200).json({
                    message: "Sucesso!",
                    token: token,
                    user: {
                        id: user.USER_ID,
                        name: user.USER_NM,
                        email: user.USER_EMAIL
                    }
                });
            } else {
                return res.status(401).json({ message: "Falha! Usuário ou senha incorretos." });
            }
        } else {
            return res.status(401).json({ message: "Falha! Usuário ou senha incorretos." });
        }
    });
});
//Rota de Informações do Usuário (Informações sobre a conta)
router.get('/user/:userId', authenticateToken, (req, res) => {
    const { userId } = req.params;
    const query = `
      SELECT USER_ID, USER_NM, USER_EMAIL, USER_FN
      FROM tbuser
      WHERE USER_ID = ?
    `;

    db.query(query, [userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(200).send(result[0]); // Envia os dados do usuário
    });
});

// Rota protegida
router.get('/protected', authenticateToken, (res) => {
    res.json({ message: "Bem-vindo! Você acessou uma rota protegida." });
});
// FIM DO TOKEN

///////////

// Rota para registrar interesse
router.post('/interest', authenticateToken, (req, res) => {
    const { comprador_id, livro_id } = req.body;

    const getSellerQuery = `
      SELECT LVRO_DN FROM tblvro
      WHERE LVRO_ID = ?`;

    db.query(getSellerQuery, [livro_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.length === 0) {
            return res.status(404).send("Livro não encontrado.");
        }

        const vendedor_id = result[0].LVRO_DN;

        // Verificar se o interesse já existe
        const checkQuery = `
        SELECT * FROM tbngco 
        WHERE NGCO_ID_COMP = ? AND NGCO_ID_LVRO = ?`;

        db.query(checkQuery, [comprador_id, livro_id], (checkErr, checkResult) => {
            if (checkErr) return res.status(500).send(checkErr);

            if (checkResult.length > 0) {
                return res.status(400).send("Você já registrou interesse nesse livro.");
            }

            // Insere o interesse se não existir
            const insertQuery = `
          INSERT INTO tbngco (NGCO_ID_COMP, NGCO_ID_LVRO, NGCO_ID_VEND, NGCO_STT)
          VALUES (?, ?, ?, 'inNegotiation')`;
            db.query(insertQuery, [comprador_id, livro_id, vendedor_id], (err, result) => {
                if (err) return res.status(500).send(err);
                res.status(200).send("Interesse registrado com sucesso!");
            });
        });
    });
});

// Rota para listar os interesses do usuário
router.get('/interests/:userId', authenticateToken, (req, res) => {
    const { userId } = req.params;
    const query = `
      SELECT 
        tbngco.*, 
        tblvro.LVRO_IMG, 
        tblvro.LVRO_TITULO, 
        tblvro.LVRO_ATR, 
        tblvro.LVRO_PRCO, 
        tblvro.LVRO_EDIT, 
        tblvro.LVRO_DT_LANC, 
        tblvro.LVRO_GEN, 
        tblvro.LVRO_QNT_PG, 
        tblvro.LVRO_ISBN,
        tbuser.USER_NM, 
        tbuser.USER_FN
      FROM tbngco
      JOIN tblvro ON tbngco.NGCO_ID_LVRO = tblvro.LVRO_ID
      JOIN tbuser ON tbngco.NGCO_ID_VEND = tbuser.USER_ID
      WHERE tbngco.NGCO_ID_COMP = ?
    `;

    db.query(query, [userId], (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      res.status(200).send(result); // Envia a lista de livros nos quais o usuário tem interesse
    });
  });

  router.delete('/interests/:interestId', (req, res) => {
    const { interestId } = req.params;
    const query = 'DELETE FROM tbngco WHERE NGCO_ID = ?';
  
    db.query(query, [interestId], (err, result) => {
      if (err) {
        
        return res.status(500).send('Erro ao deletar interesse');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Interesse não encontrado');
      }
      res.send('Interesse removido com sucesso');
    });
  });
//----------------------
module.exports = router;
