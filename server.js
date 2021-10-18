const express = require('express')
const mongoose = require('mongoose')
const TinyUrl = require('./models/tinyUrl')
const app = express()

mongoose.connect('mongodb+srv://urlchopperdb:urlchopperdppassword@urlchopper.j5qpc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/', async (req, res) => {
    const tinyUrl = await TinyUrl.find()
    res.render('index', { tinyUrl: tinyUrl , keyExists : false, message: ""})
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
        res.redirect('/')
    }
    else{
        const exists = await TinyUrl.findOne({ tiny: tinyurl})

        if(exists == null){
            await TinyUrl.create({
                full: req.body.url,
                tiny: tinyurl
            })
            res.redirect('/')
    
        }
        else{
            res.render('index', { tinyUrl: tinyUrl, message: 'Key : ' + tinyurl + 'Is already used by : ' + exists.full , keyExists : true})
            return
        }
    }
})

app.get('/delete/:remove', async (req, res) => {
    await TinyUrl.findOneAndRemove({ tiny: req.params.remove})
    res.redirect('/')
})

app.get('/:tinyUrl' , async (req, res) => {
    const tinyUrl = await TinyUrl.findOne({ tiny: req.params.tinyUrl})

    if(tinyUrl == null) return res.sendStatus(404)

    res.redirect(tinyUrl.full)
})

app.listen(process.env.PORT || 5000);  