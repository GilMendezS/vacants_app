const jwt = require('jsonwebtoken');
const env = require('../env')
exports.check_token = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).json({
            message: 'Token not provided'
        })
    }
    else {
        try {
            const token = req.headers.authorization;
            const result = jwt.verify(token, env.jwt_private)
            req.user = result;
        } catch (error) {
            return res.status(403).json({
                message:'Invalid token'
            })
        }
    }
    next();
}