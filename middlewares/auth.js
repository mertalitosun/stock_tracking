const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({success:false,message:"Oturum açmalısınız"}); 
  }

  jwt.verify(token, process.env.JwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({success:false,message:"Geçersiz Token",serverMsg:err.message});
    }
    req.user = user; 
    next(); 
  });
};

const isRole = (roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({success:false,message:"Bu işlem için yetkili değilsiniz"})
    }
    next();
  }
}

module.exports = {isAuth,isRole};