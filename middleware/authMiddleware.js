const jwt = require('jsonwebtoken');

const verifyToken = ( req, res, next ) => {
    

    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'Provide Token'
            })
        }

        try {
            const decode = jwt.verify( token, process.env.JWT_SECRET);
            req.user = decode;
            next()

        } catch (error) {
            return res.status(401).json({
                ok: false,
                message: 'Token is not valid'
            })
        }
    }else{
        return res.status(401).json({
            ok: false,
            message: 'Provide Token'
        })
    }

    
}

module.exports = verifyToken