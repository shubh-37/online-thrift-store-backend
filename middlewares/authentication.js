const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
  const authHeader = req.headers.authorization;
  if(!authHeader || authHeader.startsWith("Bearer ")){
    throw new Error("Authentication Invalid!");
  }
  const token = authHeader.split(" ")[1];
  
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {userId: payload.userID};
    next();
  } catch (error) {
    return res.status(401).send({message: error.message});
  }
}

module.exports = auth;