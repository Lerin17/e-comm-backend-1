const express = require('express')

const Cart = require('../models/Cart')
const router  = express.Router()

const {verifyToken, verifyTokenandAuth, verifyTokenandAdmin} = require('./verifyToken')


//create new cart

router.post('/', verifyToken, async (req, res)=>{

    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
    
})


//update

router.put('/:id', verifyTokenandAuth, async (req, res)=>{

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,{
                $set: req.body,
            },
            {new: true}
        )
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete


router.delete('/:id', verifyTokenandAdmin, async (req, res)=>{

    try {
         await Cart.findByIdAndDelete(req.params.id)

        res.status(200).json('...product has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all

router.get('/', verifyTokenandAdmin, async (req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json('there was an error get all')
    }
})

// router.get('/', verifyTokenandAdmin, async (req, res) =>{
//     const latestquery = req.query.new
//     try{
//       const users =  latestquery? await User.find().sort({_id: -1}).limit(1) :await User.find()
//     //   const {password, ...other} = user._doc
//         res.status(200).json(users)
//     }
//     catch(err){
//         res.status(500).json('there was an error')
//     }
// })




//get user cart
router.get('/find/:userID', verifyTokenandAuth, async (req, res)=>{

    try {
        const cart = await Cart.findOne({userID: req.params.userID})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router