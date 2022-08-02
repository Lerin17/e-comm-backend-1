// const express = require('express')
// const router = express.Router()
// // const 

// const jwt = require('jsonwebtoken')//generate password
// const bcrypt = require('bcryptjs')//encrypt password

// //check validation for request
// const {check, validationResult} = require('express-validator')
// const gravatar = require('gravatar')//get user image by email


// //Models
// const User = require('../models/user')
// const { route } = require('./products')

// route.post('/register', [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'please include a valid email').isEmail(),
//     check('password', 'please include a pass work with 6 characters or more').isLength({
//         min:6
//     })
// ], async(req, res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({
//             errors: errors.array()
//         })
//     }
//     //get name and email and password from requset
//     const {name, email, password} = req.body

//     try{
//         let user = await User.findOne({email})

//         if(user){
//             return res.status(400).json({
//                 errors:[
//                     {
//                         msg:'User already exists'
//                     },
//                 ],
//             })
//         }

//         //if not exists
//         //get image form gravatar

//         const avatar = gravatar.url(email, {
//             s: '200', //size
//             r: 'pg',//Rate
//             d: 'mm',
//         })

//         //create user object
//         user = new User({
//             name,email,avatar, password
//         })

//         //encrypt password
//         const salt = await bcrypt.genSalt(10) //generate salt contains 10
//         //save password
//         user.password = await bcrypt.hash(password, salt) //use user password and salt to hash password
//         //save user in database

//         await user.save()

//         //payload to generate token
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         }

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET, {
//                 expiresIn: 360000, //for development for production it wil
//             },
//             (err, token) => {

//             }
//         )
//     }catch(error){

//     }
// }

// )

const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        Adminrole: req.body.Adminrole,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        // username: req.body.username
    })

    try{
        const savedUser = await  newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
 
})

//login
router.post('/login', async (req, res)=>{
    try{
        
        // console.log(req.data)
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json('Wrong credentials')


        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

       

        const passwordx  = hashedPassword.toString(CryptoJS.enc.Utf8)
        passwordx !== req.body.password && res.status(401).json("Wrong credentials!")

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.Adminrole
        }, 
        process.env.JWT_SEC,
        {expiresIn: '3d'}
        )

        const { password, ...others} = user._doc

        res.status(200).json({...others, accessToken})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router