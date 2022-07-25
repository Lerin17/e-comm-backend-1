const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true 
},
email: {
    type:String,
    required:true,
    unique:true
},
password: {
    type:String,
    required:true,
    // unique:true
},

// Avatar: {
//     type:String,
//     required:true,
//     // unique:true
// },
Adminrole: {
    type:Boolean,
    default:false
},
history: {
    type:Array,
    default:[]
}
},
{timestamps:true}
,)

module.exports = User = mongoose.model('User', UserSchema)