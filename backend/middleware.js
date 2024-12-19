const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized"})
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Authorization failed"})
        }
        req.userId = decoded.id
        next()
    }catch(err){
        return res.status(403).json({message: "Unable to authorize right now"})
    }
}