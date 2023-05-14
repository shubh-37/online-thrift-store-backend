const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function userDefinedException(message, statusCode){
  this.message = message;
  this.statusCode = statusCode;
}
function auth(app, Models) {
  const { User } = Models;
  app.post("/register", async function register(req, res) {
    const { uid, phno, hosteller, email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        uid: uid,
        email: email,
        phno: phno,
        hosteller: hosteller,
        password: hashedPassword,
      });
      if(user){
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.status(201).json({ token: token, uid: user.uid });
      }else{
        return res.status(500).json({ message: "Failed create a user!"});
      }
    } catch (error) {
        if(error.message.match("E11000 duplicate key error collection:")){
            return res.status(409).json({ message: "Duplicate User" });
        }
        return res.status(500).json({ message: error.message });
    }
  });

  app.post("/login", async function login(req, res) {
    const { uid, password } = req.body;
    try{
    if (!emailId || !password) {
      throw new userDefinedException("Please enter both uid and password", 401);
    }
    const user = await User.findOne({ uid });
    if (!user) {
      throw new userDefinedException("No user found!", 404);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new userDefinedException("Wrong password!", 401);
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({ token: token, uid: user.uid });
  }catch(error){
      return res.status(error.statusCode).json({ message: error.message });
  }
  });
}

module.exports = auth;
