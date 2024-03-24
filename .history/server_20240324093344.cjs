const express = require("express");
const port = 443;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const cors = require("cors");
const app = express();
mongoose.connect("mongodb+srv://kashyaptbusiness:fTzsf8LFjh30g35e@fiziq.mkrrmei.mongodb.net/?retryWrites=true&w=majority&appName=FiziQ", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(port, ()=>console.log(`Server running on port ${port}`)))
.catch((error)=>console.log(error.message));


app.use(cors({ origin: "http://localhost:5173", credentials: true }));

var imageSchema = new mongoose.Schema({
    description: String,
    img:{
        data: Buffer,
        contentType: String
    }
});

const Post = mongoose.model("Post", imageSchema);

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
 
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

const exerciseSchema = new mongoose.Schema({
    exerciseName: String,
    sets: String,
    reps: String
   });
   
   const workoutSchema = new mongoose.Schema({
    workoutName: String,
    description: String,
    difficulty: String,
    type: String,
    numberOfDays: String,
    exercises: [exerciseSchema]
   });
   
   const workoutPlanSchema = new mongoose.Schema({
    name: String,
    user: String,
    workouts: [workoutSchema]
   });
   
   const Workout = mongoose.model("Workout", workoutPlanSchema);
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    workoutPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' }
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

app.post("/api/register", async(req, res)=>{
    const { email, username, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const oldUser = await User.findOne({ email });
        if(oldUser){
            return res.status(409).send("User already exists. Please login.");
        }
            await User.create({
                email,
                username, 
                password: hashedPassword
            })
            res.status(201).send("User created successfully.");
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/api/login", async(req, res)=>{
    const { email, password } = req.body;
    try{
        let User = mongoose.model("User", userSchema);
        let user = await User.findOne({ email });
        if(!user){
            return res.status(404).send("User not found.");
        }
        const result = await bcrypt.compare(password, user.password);
        if(!result){
            return res.status(401).send("Password is incorrect.");
        }
        const payload = {email};
        const secret = process.env.JWT_SECRET;
        const jwtToken = jwt.sign(payload, secret);
        return res.status(200).send({email, jwtToken})
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/api/forgot-password", (req, res) => {
    const { email } = req.body;
    console.log("Reached Here")
    UserModel.findOne({ email: email }).then((user) => {
      if (!user) { //remember to change back to !user
        return res.status(400).json({ msg: "There is no user with that email" });
      }
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ id: user._id }, "jwt_secret_key", {expiresIn: "1d",});
  
  
  
      var nodemailer = require("nodemailer");
  
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kpdpkt.project@gmail.com",
          pass: "aftgqkggqgybscsd",
        },
      });
  
      var mailOptions = {
        from: "kpdpkt.project@gmail.com",
        to: email,
        subject: "Reset Password Link",
        text: `http://localhost:5173/reset_password/${user._id}/${token}`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.send({Status: "Success"});
        }
      });
    });
  });
  
  app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
  
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"})
                )
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
  })
app.post("/api/create-workout", async(req, res)=>{
    const {name, user, workouts} = req.body;
    try{
        await Workout.create({
            name,
            user,
            workouts
        });
        res.status(201).send("Workout created successfully.");
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/get-workouts", async(req, res)=>{
    try{
        const workouts = await Workout.find({user: req.params.email});
        if(workouts.length === 0){
            return res.status(404).send("No workouts found.");
        }
        res.status(200).send(workouts);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/get-workout/:id", async(req, res)=>{
    try{
        const workout = await Workout.findById(req.params.id);
        if(!workout){
            return res.status(404).send("Workout not found.");
        }
        res.status(200).send(workout);
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/api/update-workout/:id", async(req, res)=>{
    const {name, user, workouts} = req.body;
    try{
        await Workout.findByIdAndUpdate(req.params.id, {
            name,
            user,
            workouts
        });
        res.status(200).send("Workout updated successfully.");
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
app.delete("/api/delete-workout/:id", async(req, res)=>{
    try{
        await Workout.findByIdAndDelete(req.params.id);
        res.status(200).send("Workout deleted successfully.");
    } catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});








app.get('/api/get-post', (req, res) => {
    imageSchema.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render('imagepage',{items: data})
    })
});
// app.post('/api/create-post', upload.single('image'), (req, res, next) => {
 
//     var obj = {
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imageSchema.create(obj)
//     .then ((err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.redirect('/');
//         }
//     });
// });
app.post('/api/create-post', upload.single('image'), (req, res, next) => {
 
    var obj = {
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Post.create(obj)
    .then ((err, item) => {
        if (err) {
            console.log("Reached Here");
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});





