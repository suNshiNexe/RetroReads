const jwt = require("jsonwebtoken");

const JWT_SECRET = "RR2024";

function generateToken(user) {
    return jwt.sign(
        { 
            id: user.USER_ID, 
            name: user.USER_NM, 
            email: user.USER_EMAIL 
        },
        JWT_SECRET, {  expiresIn: '1h' }
    );
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
;
    if (!token) return res.sendStatus(401)

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };
