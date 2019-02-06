const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser : true})
  .then(() => {
      console.log('connected to MongoDB')
  })
  .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
  })

const winnerSchema = new mongoose.Schema({
    name: String,
    prizeSize: String,
    date: Date
})

module.exports = mongoose.model('Winner', winnerSchema)