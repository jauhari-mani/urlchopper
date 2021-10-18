const mongoose = require('mongoose')
const shortId = require('shortid')

const tinyUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    tiny:{
        type: String,
        required: true,
        default: shortId.generate
    }
})

module.exports = mongoose.model('tinyUrl' , tinyUrlSchema)