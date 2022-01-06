/* Requires */
const path = require('path')
const multer = require('multer');
const express = require('express');
var router = express.Router();
const {login, register, processRegister, processLogin, logout, profileUser, profileUserChanges} = require('../controllers/usersController')
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');
const userValidation = require('../validations/userValidation');
const userMiddleware = require('../middlewares/userMiddleware');


/* Users Multer */

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        let folder = path.join('public/img/users');
        callback(null, folder);
    },
    filename : (req, file, callback) => {
        console.log(file)
        let imageName = Date.now() + path.extname(file.originalname)
        callback(null, imageName)
    }
})

let upload = multer({storage:storage})


/* Esto viene como /users/... */

router.get('/login',login);
router.post('/login',loginValidation, processLogin);
router.get('/register', register);
router.post('/register', registerValidation , processRegister);
router.get('/logout',logout);
router.get('/miperfil',userMiddleware, profileUser);
router.put('/miperfil', userMiddleware, upload.single('fotoUsuario') ,userValidation, profileUserChanges)
module.exports = router;
