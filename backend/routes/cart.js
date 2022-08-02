const express = require('express')
const mongoose = require('mongoose')

const Cart = require('../models/Cart')
// const product = require('../models/product')
const Product = require('../models/product')

const router  = express.Router()

const {verifyToken, verifyTokenandAuth, verifyTokenandAdmin} = require('./verifyToken')


//create new cart and add new items to the cart

router.post('/:userID/:productID', async (req, res)=>{

    // const newCart = new Cart(req.body)

    const userid = req.params.userID
    const productid = req.params.productID

    try {
        const getUserCart = await Cart.find({'userID': userid})
        const getProduct = await Product.findById(productid)

        if(!getUserCart.length){
            const newCart = new Cart({
                userID: userid,
                products: [
                    {productID: getProduct._id ,
                    productDetails: getProduct,
                    quantity: 1}
                ]
            })

            
            try{
                // console.log('got here')
                // console.log(getProduct)
                const savedNewCart = await newCart.save()
               
                res.status(200).json(savedNewCart)
            }
            catch(error){
                res.status(500).json(error)
            }
        }else{

            try {
                const updatedCart = await Cart.findOneAndUpdate(
                    {'userID':userid},
                    {$push: {products:  {productID: getProduct._id ,
                                        productDetails: getProduct}}},
                    { new: true }
                )

                // const saveduserfavourite = await updateduserfavourite.save()
                res.status(200).json(updatedCart)
            } catch (error) {
                res.status(500).json(error)
            }
        }
    } catch (error) {
        res.status(500).json(error) 
    }

 

    // try {
    //     const getProduct = await Product.findById(req.params.id)
      
    //     const newcarrtitem = new Cart({
    //     name: getProduct.name,
    //     price: getProduct.price,
    //     description: getProduct.description,
    //     type: getProduct.type,
    //     color: getProduct.color,
    //     image:getProduct.image,
    //     imagearray:getProduct.imagearray,
    //     alt:getProduct.alt,
    //     productID:getProduct._id,
    //     isNewArrival: req.body.isNewArrival
    // })
    
    //         const savedcartitem = await newcarrtitem.save()
    //         res.status(200).json(savedcartitem)
    //     // const savedCart = await newCart.save()
    //     // res.status(200).json(savedCart)
    // } catch (error) {
    //     res.status(500).json(error)
    // }
    
})

   //update a product quantity in the cart

   router.put('/:userID/:productID', async (req, res)=>{

    const userid = req.params.userID
    const productid = req.params.productID

    try {
        
      

        if(!myCart.length){
            return res.status(400).json({
                error :"no user found"
            })
        }else{
            console.log('for all time')
        

        const alteredProduct = await Cart.findOneAndUpdate({'userID': userid,
        'products.productID': productid},
        { $inc: {'products.$.quantity':  1}},
        {new:true})

   
            res.status(200).json(alteredProduct)
        }

    
    } catch (error) {
        res.status(500).json(error) 
    }
})


//update

// router.put('/:id', verifyTokenandAuth, async (req, res)=>{

//     try {
//         const updatedCart = await Cart.findByIdAndUpdate(
//             req.params.id,{
//                 $set: req.body,
//             },
//             {new: true}
//         )
//         res.status(200).json(updatedCart)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

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