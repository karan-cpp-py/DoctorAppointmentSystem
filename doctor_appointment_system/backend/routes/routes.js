const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const NewsTable = require('../models/latestnews');
const DoctorAvailability = require('../models/doctoravailability');
const Bookings = require('../models/bookings');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "qwertyuiopasdfghjklzxcvbnmqwerty";
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profileImages');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({ storage: storage });

//register new user
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const data = new UserModel(
        {
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            role: req.body.role
        }
    );

    try {
        const savedData = await data.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//login to system
router.post('/login', async (req, res) => {
    let email = req.body.email;
    let pwd = req.body.password;
    //console.log(req.body);
    try {
        const data = await UserModel.findOne({ email });
        if (!data) {
            return res.status(400).json({ message: "please enter correct credentials" });
        }
        const password = await bcrypt.compare(pwd, data.password);
        if (!password) {
            return res.status(400).json({ message: "please enter correct password" });
        }
        const key = { user: { id: data.id } };
        const authToken = jwt.sign(key, jwtSecretKey);
        return res.json({ userData: data, authToken: authToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//get user detail
router.get("/getuserdetails/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userDetail = await UserModel.findById({ _id: id });
        // console.log(userDetail);
        res.status(200).json({ status: 200, userData: userDetail });
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

//update doctor detail
router.patch("/updateuserdetails/:id", uploadImage.single('profile_image'), async (req, res) => {
    try {
        const { id } = req.params;
        const newProfileImage = req.file ? { profile_image: req.file.filename } : {};
        const existingData = await UserModel.findById({ _id: id });
        if (existingData.fee_per_consultation !== req.body.fee_per_consultation
            || existingData.work_experience !== req.body.work_experience
            || existingData.qualification !== req.body.qualification
            || existingData.specialization !== req.body.specialization) {
            req.body.approval = 1;
        }
        const userData = await UserModel.findByIdAndUpdate(id, { ...req.body, ...newProfileImage }, { new: true });
        res.status(200).json({ data: userData });
    } catch (error) {
        res.status(404).send(error);
    }
})

//get doctors list for approval
router.get('/getApprovalRequestList', async (req, res) => {
    try {
        const doctorsList = await UserModel.find({ role: 'doctor', approval: 1 });
        res.status(200).json({ doctorsList: doctorsList });
    } catch (error) {
        res.status(404).json(error);
    }
})

//get approved doctors' list
router.get('/getapproveddoctors', async(req,res)=> {
    try {
        const doctorData = await UserModel.find({approval:2});
        res.status(200).json(doctorData);
    } catch (error) {
        res.status(400).json(error);
    }
})

// update doctor availability
router.post('/submitdoctoravailability', async (req, res) => {
    const data = new DoctorAvailability({
        doctor_id: req.body.doctor_id,
        time_slot: req.body.time_slot,
        morning: {
            from: req.body.morning.from,
            to: req.body.morning.to
        },
        afternoon: {
            from: req.body.afternoon.from,
            to: req.body.afternoon.to
        },
        evening: {
            from: req.body.evening.from,
            to: req.body.evening.to
        }
    });

    try {
        const findFirst = await DoctorAvailability.findOne({ doctor_id: data.doctor_id });
        if (findFirst == null) {
            const savedData = await data.save();
            res.status(200).json({ data: savedData });
        }
        else {
            const savedData = await DoctorAvailability.findOneAndUpdate({doctor_id: data.doctor_id}, { ...req.body }, { new: true });
            res.status(200).json({ data: savedData });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// get doctors' availabilities
router.get('/getdoctoravailability/:id', async(req,res)=> {
    const { id } = req.params;
    try {
        const data = await DoctorAvailability.findOne({doctor_id:id});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

//get already booked slots
router.get('/getalreadybookedslots/:id', async(req,res)=> {
    const {id} = req.params;
    try {
        const data = await Bookings.find({doctor_id:id});
        //console.log(data);
        res.status(200).json({data:data});
    } catch (error) {
        res.status(400).json(error);
    }
})

//submit bookings
router.post('/submitbookings', async(req,res)=> {
    try {
        const data = new Bookings(req.body);
        const savedData = await data.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(400).json(error);
    }
});

//latest news entry
router.post('/newsentry', async (req, res) => {
    const news = new NewsTable(
        {
            date: req.body.date,
            news: req.body.newnews
        }
    );
    try {
        const savedNews = await news.save();
        res.status(200).json({ status: 200 });
    } catch (error) {
        res.status(400).json({ status: 400 });
    }
})

//fetch latest news
router.get('/latestnews', async (req, res) => {
    const news = await NewsTable.find();
    res.status(200).json({ status: 200, latestnewsdata: news });
})

module.exports = router;