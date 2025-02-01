const jwt = require('jsonwebtoken');

const generateToken = (accountId, res) => {
    const token = jwt.sign({accountId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    // { id: user._id, role: user.role, name: user.name, photo: user.photo },

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //milisecond
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development'
    })

    return token;
}

module.exports = {
    generateToken
}