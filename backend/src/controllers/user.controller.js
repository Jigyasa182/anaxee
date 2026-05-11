const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if(existingUser){
            return res.status(400).json({ message: "Username or email already exists" });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });


    }

};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }   
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }

};

module.exports = { registerUser, loginUser };