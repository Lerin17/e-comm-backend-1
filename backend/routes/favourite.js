

const express = require('express')
const router  = express.Router()

const Favourite = require('../models/Favourite')
const Product = require('../models/product')

//add new product to favourites
router.post('/:id', async(req, res)=>{
    try{
        const getProduct = await Product.findById(req.params.id)

    const newfavouriteProduct = new Favourite({
    name: getProduct.name,
    price: getProduct.price,
    description: getProduct.description,
    type: getProduct.type,
    color: getProduct.color,
    image:getProduct.image,
    imagearray:getProduct.imagearray,
    alt:getProduct.alt,
    productID:getProduct._id,
    isNewArrival: req.body.isNewArrival
    // username: req.body.username
})

        const favProduct = await newfavouriteProduct.save()
        res.status(200).json(favProduct)
    }catch(err){
        res.status(500).json(err)
    }
  
})

//get all favourite products
router.get('/', async (req, res) => {
    try {
        const allFavourite = await Favourite.find()
        res.status(200).json(allFavourite)
    } catch (err) {
        res.status(500).json(err)
    }
})

//remove a product from favourites
router.delete('/:id', async(req, res)=>{
   
        try{
            await Favourite.findByIdAndDelete(req.params.id)
           res.status(200).json("product has been deleted...")
       }catch(err){
           res.status(500).json(err)
       }

  
})

//remove all products from favourites

router.delete('/', async(req, res)=>{
   
        try{
         await Favourite.deleteMany() 
         res.status(200).json("all products have been deleted...")
        }catch(err){
            res.status(500).json(err)
        }

  
})

//remove all items, all products



module.exports = router
// try{
//     await Product.findByIdAndDelete()
//    res.status(200).json("product has been deleted...")
// }catch(err){
//    res.status(500).json(err)
// }


// router.post('/',  verifyTokenandAdmin, async(req, res)=>{
//     const newProduct = new Favourite({
//         name: req.body.name,
//         price: req.body.price,
//         description: req.body.description,
//         type: req.body.type,
//         color: req.body.color,
//         image:req.body.image,
//         imagearray:req.body.imagearray,
//         alt:req.body.alt,
//         // ProductID: req.body.ProductID,
//         isNewArrival: req.body.isNewArrival
//         // username: req.body.username
//     })

//     try{
//         const savedProduct = await newProduct.save()
//         res.status(200).json(savedProduct)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })