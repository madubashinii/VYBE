import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    // Try header first, then cookies
    let token = null;
    const header = req.headers.authorization;
    if (header && header.startsWith("Bearer ")) token = header.split(" ")[1];
    if (!token && req.cookies && req.cookies.token) token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // normalize shape
        req.user = { id: decoded.id, ...decoded };
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
