const router = require('express').Router()

const {verifyTokenandAuth, verifyTokenandAdmin, verifyToken} = require('./verifyToken')
const CryptoJS = require('crypto-js')

const Product = require('../models/product')
const User = require('../models/User')
const UsersFavourites = require('../models/UsersFavourites')
// const Product = require('../models/product')


//create new fav and add items to user fav

router.post('/:userID/:productID', async (req,res)=>{

    const userid = req.params.userID
    const productid = req.params.productID

    try {
        const getProduct = await Product.findById(productid)

        // console.log(getProduct)

        

        const getuserFavourite = await UsersFavourites.find({'userID':userid})

        // if(getuserFavourite){
        //     console.log(getuserFavourite, 'damnbaby')
        // }

        
        if(!getuserFavourite.length){
            const newFavourites = new UsersFavourites({
                userID: userid,
                products: [
                    {productID: getProduct._id ,
                    productDetails: getProduct}
                ] 
            })

            
            try{
                const savednewFavourites = await newFavourites.save()
                res.status(200).json(savednewFavourites)
            }
            catch(error){
                res.status(500).json(error)
            }
        }else{
            console.log(getuserFavourite)
       

            try {
                const updateduserfavourite = await UsersFavourites.findOneAndUpdate(
                    {'userID':userid},
                    {$push: {products:  {productID: getProduct._id ,
                                        productDetails: getProduct}}},
                    { new: true }
                )

                // const saveduserfavourite = await updateduserfavourite.save()
                res.status(200).json(updateduserfavourite)
            } catch (error) {
                res.status(500).json(error)
            }
      
        }

        
 
             
    } catch (error) {
        res.status(500).json(error)
    }

})

//get all favourites item from a user

router.get('/:userID', async(req, res)=>{
    const userid = req.params.userID

    try {
        const getuserFavourites = await UsersFavourites.find({'userID':userid})

        res.status(200).json(getuserFavourites)

        if(!getuserFavourites.length){
            res.status(404).json('user not found')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete items from user fav
router.delete('/:userID/:productID', async (req, res)=>{
    const userid = req.params.userID
    const productid = req.params.productID

    try {

    // const getproduct = await UsersFavourites.find()
        
    const updateduserfavourite =  await UsersFavourites.findOneAndUpdate(
            {'userID':userid},
            {'$pull': {'products': {'productID': productid}}},
            { new: true }
        )

        res.status(200).json(updateduserfavourite)

    } catch (error) {
        res.status(500).json(error) 
    }

 
    // const finduserfav = await UsersFavourites.find({'userID':userid})
})

module.exports = router