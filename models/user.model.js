const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3,"Username must be at least 3 characters"],

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[6,"Password must be at least 6 characters"],

    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;