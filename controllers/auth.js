const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const Roles = require("../models/roles");
const generate_password = require("generate-password");


const validation = require("../middlewares/validation");

exports.post_change_password = async (req,res) => {
  
  const validationError = validation(req, res);
  if (validationError) return validationError;

  const { currentPassword, newPassword } = req.body;
  if(!req.user){
    return res.status(401).json({success:false, message:"Kullanıcı Bulunamadı"})
  }
  const userId = req.user.id; 

  try {
    const user = await Users.findByPk(userId);

    if(!user){
      return res.status(401).json({success:false,message:"Kullanıcı Bulunamadı"})
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Eski şifre hatalı",
      });
    }

   
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.status(200).json({
      success: true,
      message: "Şifre başarıyla değiştirildi",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

exports.post_forgot_password = async (req,res) => {
  const {email} = req.body;

  const validationError = validation(req, res);
  if (validationError) return validationError;

  const user = await Users.findOne({where:{email}});

  if(!user){
    return res.status(404).json({
      success:false,
      message:"Girilen e-posta adresine kayıtlı kullanıcı bulunamadı"
    })
  }

  try{
    const new_password = generate_password.generate({length:10,numbers:true})
    const hashedPassword = await bcrypt.hash(new_password, 10);

    await user.update({password:hashedPassword});

    const subject = "Şifre Yenileme";
    const text = `Yeni Şifreniz: ${new_password}`;
    await sendNewMail(user.email, subject, text); 
    res.status(200).json({
      success:true,
      message:"Yeni şifre kayıtlı e-posta adresine gönderildi"
    })

  }catch(err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

exports.post_register = async (req, res) => {
  const { name, surname, email, password,roleId } = req.body;

  try {

    //validasyon kontrolü
    const validationError = validation(req,res)
    if(validationError){
      return validationError
    }
  

    const existingUsers = await Users.findOne({ where: { email } });
    if (existingUsers) {
      return res.status(400).json({ status: 400, message: "Bu e-posta adresi zaten kayıtlı" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await Users.create({
      name,
      surname,
      email,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json({
      success: true,
      data: user,
      message: "Kullanıcı başarıyla kaydedildi",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({success:false, message: "Sunucu Hatası", serverMsg:err.message });
  }
};

exports.post_login = async (req,res) => {
  const {email,password} = req.body;

  //validasyon kontrolü
  const validationError = validation(req,res)
  if(validationError){
    return validationError
  }

  const user = await Users.findOne({where:{email},include:{
    model:Roles
  }});

  if(!user){
    return res.status(404).json({
      success:false,
      message:"Girilen e-posta adresine kayıtlı kullanıcı bulunamadı"
    })
  }

  const match = await bcrypt.compare(password,user.password);

  if(!match){
    return res.status(401).json({
      success:false,
      message:"Hatalı Parola!"
    })
  }

  const token = jwt.sign({id:user.id,role:user.role.name},process.env.JwtSecret,{expiresIn:"1h"});
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
  res.status(200).json({
    success:true,
    message:"Giriş Başarılı",
    token,
    user
  })
};

exports.get_logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
      success:true,
      message:"Çıkış Başarılı",
  })
};