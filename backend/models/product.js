// const mongoose = require('mongoose')

// const productSchema = new mongoose.Schema(
//     {
//         name: {
//           type: String,
//           require: [true, 'product name must be provided']
//         },
        
//         price: {
//             type: Number,
//             require: [true, 'product name must be provided']
//           },

//         featured: {
//             type: Boolean,
//             default: false
//             // require: [true, 'product name must be provided']
//           },
//           rating: {
//               type: Number,
//               default: 4.5
//           },
//           createdAt: {
//               type: Date,
//               default: Date.now()
//           },
//           company: {
//               type: String,
//               enum: {
//                   values: ['ikea', 'liddy', 'caressa', 'marcos'],
//                   message: '{VALUE} is not supported'
//               }
//           }
//     }
// )


// module.exports = mongoose.model('Product', productSchema)

const mongoose = require('mongoose')

// mongoose.connection.models
console.log(mongoose.connection.models)


const productSchema = new mongoose.Schema({
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
            },
            altImagesHF: {
                type:Array,
                default: []
            }
        } 
    ],
    imagearrayHF: {
        type:Array,
    }

},{
    timestamps:true
}) 


module.exports = Product = mongoose.model('Product', productSchema)

 