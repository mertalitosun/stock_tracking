const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth");

const {body} = require("express-validator"); //validator
const {isAuth, isRole} = require("../middlewares/auth");


router.post("/register",
    [
        body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
        body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
isAuth,isRole(["Admin"]),authController.post_register);


router.post("/login",
    [
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
authController.post_login);


router.post("/forgot-password",[body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),],authController.post_forgot_password);


router.post("/change-password",
    [
        body("currentPassword").notEmpty().withMessage("Mevcut şifre alanı boş bırakılamaz"),
        body("newPassword").notEmpty().withMessage("Yeni şifre alanı boş bırakılamaz"),
],isAuth,authController.post_change_password);


router.get("/logout", authController.get_logout);


module.exports = router;