const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
            unique:true
        },
        password: {
            required: true,
            type: String
        },
        role: {
            required: true,
            type: String
        },
        phone: {
            type: Number
        },
        gender: {
            type: String
        },
        dob: {
            type: String
        },
        marital_status: {
            type: String
        },
        qualification: {
            type: String
        },
        work_experience: {
            type: String
        },
        specialization: {
            type: String
        },
        adhar_no: {
            type: Number
        },
        father_name: {
            type: String
        },
        mother_name: {
            type: String
        },
        approval: {
            type: Number,
            default: 0
        },
        profile_image: {
            type:String
        },
        fee_per_consultation: {
            type:Number,
            default: 0
        },
        created_at: {
            type: Date,
            default: new Date()
        }
    }
);

const users = new mongoose.model("users",userSchema);
module.exports = users;