const Account = require('../models/account');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../lib/utils')

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const account = await Account.findOne({email})

        if(!account){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, account.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        generateToken(account._id, res)

        res.status(201).json({
            _id: account._id,
            name: account.name,
            email: account.email,
            role: account.role,
            status: account.status,
            photo: account.photo
        })
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}