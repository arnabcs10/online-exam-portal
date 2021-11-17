const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const examinerSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
});

examinerSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
}

examinerSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    
    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Examiner = mongoose.model('examiner',examinerSchema);

module.exports = Examiner;