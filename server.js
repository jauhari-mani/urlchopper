const express = require('express')
const mongoose = require('mongoose')
const TinyUrl = require('./models/tinyUrl')
const SignUp = require('./models/signUp')
const app = express()
const LocalStorage = require('node-localstorage').LocalStorage

localStorage = new LocalStorage("./scratch")

mongoose.connect('mongodb+srv://urlchopperdb:Password123@urlchopper.j5qpc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/home', async (req, res) => {
    console.log(localStorage.getItem('emailId'));
    console.log('hello!');
    const tinyUrl = await TinyUrl.find()
    res.render('index', { tinyUrl: tinyUrl , keyExists : false, message: ""})
})

app.post('/login', async(req, res) => {
    const emailCheck = await SignUp.findOne({email: req.body.email})
    if(emailCheck != null){
        const userPassword = emailCheck.password
        if(userPassword === req.body.password){
            console.log(req.body.email)
            localStorage.setItem("emailId", req.body.email)
            res.redirect("/home")
        }
    }
    else{
        req.body.keyExists = true
        res.render('login',{message: "User not registered", keyExists: true})
        return
    }
})

app.post('/register', async(req, res) => {
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        const emailExists = await SignUp.findOne({email: req.body.email})
        if(emailExists != null){
            req.body.keyExists = true
            res.render('signup', {message: 'Email already registered', keyExists : true})
            return
        }

        const phoneNumberExists = await SignUp.findOne({phoneNumber: req.body.phoneNumber})
        if(phoneNumberExists != null){
            req.body.keyExists = true
            res.render('signup', {message: req.body.phoneNumber + " already registered", keyExists: true})
            return
        }
        
        if(password === confirmPassword){
            await SignUp.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: password
            })
            res.redirect('/')
        }
        else{
            req.body.keyExists = true
            res.render('signup', {message: 'Password and Confirm Password not same', keyExists: true})
            return
        }
})

app.post('/tinyUrl', async (req, res) => {
    const fullurl = await TinyUrl.findOne({full : req.body.url})
    const tinyurl = req.body.customkey
    const tinyUrl = await TinyUrl.find()

    if(fullurl != null){
        req.body.keyExists = true
        res.render('index', { tinyUrl: tinyUrl, message: 'Already exists : ' + fullurl.tiny , keyExists : true})
        return
    }

    if(tinyurl == ""){
            await TinyUrl.create({
            full: req.body.url
        })
        res.redirect('/home')
    }
    else{
        const exists = await TinyUrl.findOne({ tiny: tinyurl})

        if(exists == null){
            await TinyUrl.create({
                full: req.body.url,
                tiny: tinyurl
            })
            res.redirect('/home')
    
        }
        else{
            res.render('index', { tinyUrl: tinyUrl, message: 'Key : ' + tinyurl + 'Is already used by : ' + exists.full , keyExists : true})
            return
        }
    }
})

app.get('/' , async (req,res) => {
    res.render('login', {keyExists: false, message: ""})
})


app.get('/signUp' , async (req,res) => {
    res.render('signup', {keyExists: false, message: ""})
})


app.get('/delete/:remove', async (req, res) => {
    await TinyUrl.findOneAndRemove({ tiny: req.params.remove})
    res.redirect('/home')
})

app.get('/:tinyUrl' , async (req, res) => {
    const tinyUrl = await TinyUrl.findOne({ tiny: req.params.tinyUrl})

    if(tinyUrl == null) return res.sendStatus(404)

    res.redirect(tinyUrl.full)
})

app.listen(process.env.PORT || 8000);  