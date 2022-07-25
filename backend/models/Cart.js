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

const CartSchema = new mongoose.Schema({
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
            quantity:{
                type:Number,
                default: 1
            }
        }
    ]

},{
    timestamps:true
}) 


module.exports = mongoose.model('Cart', CartSchema)

 