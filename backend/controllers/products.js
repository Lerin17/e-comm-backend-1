// const { products } = require('../../../02-express-tutorial/data')
// const Product = require('../models/product')

// const getAllProductsStatic = async (req, res) => {
//     const products = await Product.find({featured: true})
//         res.status(200).json({products, nbHits: products.length})

//     // throw new Error('testing async error')

// }

// const getAllProducts = async (req, res) => {
//     res.status(200).json({msg: 'products  routes'}) 
// }

// module.exports = {
//     getAllProducts,
//     getAllProductsStatic
// }

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing aync errors')

    res.status(200).json({msg:'product testing'})
}

const getAllProducts = async (req, res) => {
    res.status(200).json({msg:'product '})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}