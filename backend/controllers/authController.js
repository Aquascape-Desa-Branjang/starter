const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const authenticate = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        
        if (username !== user.username) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );

        res.json({ message: "Authenticated", token });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: error });
    }
};

module.exports = authenticate;
