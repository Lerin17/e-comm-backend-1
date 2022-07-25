const express = require('express')

const Order = require('../models/Order')
const router  = express.Router()

const {verifyToken, verifyTokenandAuth, verifyTokenandAdmin} = require('./verifyToken')


//create an order, i guess


router.post('/', verifyToken, async (req, res) => {

    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
    
})


//update

router.put('/:id', verifyTokenandAdmin, async (req, res)=>{

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,{
                $set: req.body,
            },
            {new: true}
        )
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete

router.delete('/:id', verifyTokenandAdmin, async (req, res)=>{

    try {
      await Order.findByIdAndDelete(req.params.id)

        res.status(200).json('...Order has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all orders

router.get('/', verifyTokenandAdmin, async (req, res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json(error)
    }
})


//get monthly income

router.get('/income', verifyTokenandAdmin, async (req, res)=> {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))

    try{
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte:prevMonth}}},
            {
                $project:{
                    month: {$month: '$createdAt'},
                    sales: '$amount'
                }
            },{
                $group:{
                    _id: '$month',
                    total: {$sum: '$sales'}
                }
            }
        ])



        res.status(200).json(income)
    }catch(err){
        res.status(500).json(err)
    }

})


//get user order
router.get('/find/:userID', verifyTokenandAuth, async (req, res)=>{

    try {
        const order = await Order.find({userID: req.params.userID})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router