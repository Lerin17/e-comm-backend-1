


// module.exports = router

const express = require('express')
// const product = require('../models/product')
const router  = express.Router()

const Product = require('../models/product')

const {verifyToken, verifyTokenandAuth, verifyTokenandAdmin} = require('./verifyToken')


//create 

router.post('/',  verifyTokenandAdmin, async(req, res)=>{
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        color: req.body.color,
        image:req.body.image,
        imagearray:req.body.imagearray,
        alt:req.body.alt,
        // ProductID: req.body.ProductID,
        isNewArrival: req.body.isNewArrival
        // username: req.body.username
    })

    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//update

router.put('/:id', verifyTokenandAdmin, async(req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            },
            {new: true}
        )

        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete

router.delete('/:id', verifyTokenandAdmin, async(req, res)=>{
    try{
         await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//get product

router.get('/:id',  async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
        console.log('damn sonny')
    }
})

// router.get('/find/:id', verifyTokenandAdmin, async (req, res) =>{
//     try{
//       const user =  await User.findById(req.params.id)
//       const {password, ...other} = user._doc
//         res.status(200).json(other)
//     }
//     catch(err){
//         res.status(500).json('there was an error')
//     }
// })




//get all products
router.get('/', async(req, res)=>{
    const qNew = req.query.new
    const qCategory = req.query.category
    let products


    

    try{
        // const AllProduct = await Product

        products = await Product.find()

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if(qCategory){
            products = await Product.find({category:{
                $in:[qCategory]
            }})
        }
        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)
    }
})


// const {getAllProducts,
//     getAllProductsStatic} = require('../controllers/products')

// router.route('/static').get(getAllProductsStatic)
// router.route('/').get(getAllProducts)

// module.exports = router

module.exports = router