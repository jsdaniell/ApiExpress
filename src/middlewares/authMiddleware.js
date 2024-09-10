const AUTHORIZATION_UUID = "05679c7a-639e-4bf2-a28e-64c425387656"

const authMiddleware = (req, res, next) => {
    if(req.headers.authorization !== AUTHORIZATION_UUID) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}

export default authMiddleware;