const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { protect };