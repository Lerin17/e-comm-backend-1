const router = require('express').Router()
const User = require('../models/User')
const {verifyTokenandAuth, verifyTokenandAdmin, verifyToken} = require('./verifyToken')
const CryptoJS = require('crypto-js')


router.put('/:id', verifyTokenandAuth, async (req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})

        const {password, ...others} = updatedUser._doc
    //    const updatedUser = {password, ...others}

        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err)
    }
})

//delete 
router.delete('/:id', verifyTokenandAuth, async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted....')
    }
    catch(err){
        res.status(500).json('there was an error')
    }
})

//get any user only admin
router.get('/find/:id', verifyTokenandAdmin, async (req, res) =>{
    try{
      const user =  await User.findById(req.params.id)
      const {password, ...other} = user._doc
        res.status(200).json(other)
    }
    catch(err){
        res.status(500).json('there was an error')
    }
})


//get all users
router.get('/', verifyTokenandAdmin, async (req, res) =>{
    const latestquery = req.query.new
    try{
      const users =  latestquery? await User.find().sort({_id: -1}).limit(1) :await User.find()
    //   const {password, ...other} = user._doc
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json('there was an error')
    }
})

//get user stats
router.get('/stats', verifyTokenandAdmin, async(req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte:lastYear}}},
            {
                $project:{
                    month: {$month: '$createdAt'}
                }
            },{
                $group:{
                    _id: '$month',
                    total: {$sum: 1}
                }
            }
        ])



        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router

