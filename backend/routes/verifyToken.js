const jwt = require("jsonwebtoken")
const router = require("./products")


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
           if(err) res.status(403).json("token is not valid")
           req.user = user 
        //    console.log(user)
           next()
        })
    }else{
        return res.status(401).json("you are not authenticated")
    }
}


const verifyTokenandAuth = (req, res, next )=> {

    verifyToken(req, res ,  ()=>{
        // console.log(req.user)
        if(req.user.id === req.params.id || req.user.Adminrole){
            next()
        }else{
            res.status(403).json('You do not have clearance for this operation')
        }
    })
}

const verifyTokenandAdmin  = (req, res, next )=> {
    // console.log(req)
    verifyToken(req, res , ()=>{
        // console.log(req.user)
        if(req.user.isAdmin){
          
            next()
        }else{
            res.status(403).json('You do not have clearance for this admin  operation')
        }
    })
}




module.exports = {verifyToken, verifyTokenandAuth, verifyTokenandAdmin}