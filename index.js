require('dotenv').config()
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Winner = require('./models/winner')
const app = express()

let count = require('./data/count.json')

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())

app.get('/api/winners', (req, res) => {
    Winner.find({}).then(winners => {
        res.json(winners.map(winner => winner.toJSON()))
    })
})

app.post('/api/count', (req, res) => {
    const body = req.body
    count = count + 1
    fs.writeFileSync('./data/count.json', count, 'utf8', (err) => {
        if (err) console.log(err)
    })

    const name = ((body.name === "" || body.name === undefined) ? "Tuntematon" : body.name)
    if (count % 500 === 0) {
        res.json(handleWin("Voitit suuren palkinnon!", "large", name, true))   
    } else if (count % 200 === 0) {
        res.json(handleWin("Voitit keskikokoisen palkinnon!", "medium", name, true))
    } else if (count % 100 === 0) {
        res.json(handleWin("Voitit pienen palkinnon!", "small", name, true))
    } else {
        res.json(handleWin("Ei voittoa", null, name, false))
    }
})

const getClicksToWin = () => {
    return 100 - (count % 100)
}

const handleWin = (message, prize_size, name, winning) => {
    const note = {
        winner: winning,
        prize_size: prize_size,
        message: message,
        clicks_to_win: getClicksToWin(),
    }

    if (winning) {
        const winner = new Winner({
            name: name,
            prizeSize: prize_size,
            date: new Date()
        })

        winner.save()
          .then(savedWinner => {
              console.log(savedWinner)
          })
          .catch(error => {
              console.log(error.message)
          })
    }
    
    return note
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
