const jwt = require('jsonwebtoken');
const env = require('node-env-file');
const rootDir = require('../../utils/path');
const path = require('path')


exports.check_token = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).json({
            message: 'Token not provided'
        })
    }
    else {
        try {
            const token = req.headers.authorization;
            const result = jwt.verify(token, process.env.JWT_SECRET)
            req.user = result;
        } catch (error) {
            return res.status(403).json({
                message:'Invalid token'
            })
        }
    }
    next();
}