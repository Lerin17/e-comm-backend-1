const mongoose = require('mongoose')

const usersfavouritesSchema = new mongoose.Schema({
    userID: {
        type:String,
        required:[true, 'product name must be provided'],
        unique:true
    },
    products: [
        {
            productID:{
                type:String
            },
            productDetails:{
                type:Object
            }
        }
    ],

},{
    timestamps:true
}) 

module.exports = usersfavourites = mongoose.model('usersFavourites', usersfavouritesSchema)