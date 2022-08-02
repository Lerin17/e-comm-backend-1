

const mongoose = require('mongoose')

// mongoose.connection.models

console.log(mongoose.connection.models, 'favorite models 45')



const favouriteSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'product name must be provided'],
        unique:true
    },
    price: {
        type:Number,
        required:[true, 'product price must be provided']
    },
    description:{
    type:String
    },
    type: {
        type:Array,
        default:[]
    },
    color: {
        type:Array,
        default:[]   
    },
    isNewArrival: {
        type:Boolean,
        default:false
    },
    image: {
        type:String,
        required:true
    },
    imagearray: {
        type:Array,
        required:true
    },
    productID: {
        type:String
    },
    alt: [
        {
            altName:{
                type:String
            },
            image: {
                type:String
            },
            altImages:{
                type:Array,
                default: []
            }
        } 
    ]

},{
    timestamps:true
}) 


module.exports = Favourite = mongoose.model('Favourite', favouriteSchema)

 