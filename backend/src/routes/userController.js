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
                req.body.ende_num  || null,
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

// Rota protegida
router.get('/protected', authenticateToken, (res) => {
    res.json({ message: "Bem-vindo! Você acessou uma rota protegida." });
});

module.exports = router;
