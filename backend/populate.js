// require('dotenv').config()

// const connectDB  = require('./db/connect')
// const Product = require('./models/product')

// const jsonProducts = require('./products.json')


// const start = async ()=>{
//     try{
//     await connectDB(process.env.MONGO_URI)
//     await Product.deleteMany();
//     await Product.create(jsonProducts)
//     console.log('success')
//     process.exit(0)
//     }
//     catch(error){
//     console.log(error)
//     process.exit(1)
//     }
// }

// start()


//new new
// require ('dotenv').config()

// const connectDB = require('./db/connect')
// const Product = require('./models/product')

// // const jsonProducts = require('../image/new arrival/newarrivaldata')
// const jsonProducts = require('./rawdata/productrawdata')

// const start = async () => {
//     try {
//     await connectDB(process.env.MONGO_URI)
//     console.log('Success!!')
//     }catch(error){
//          console.log(error)
//     }
// }

// start()

// console.log(jsonProducts)