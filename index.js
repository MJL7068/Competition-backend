const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())

let count = {
    number: 95,
    winner: false,
    message: 'No win'
}

let winners = [
    {
        id: 1,
        name: 'Matti'
    },
    {
        id: 2,
        name: 'Sanna'}
]

app.get('/api/count', (req, res) => {
    res.json(count)
})

app.get('/api/winners', (req, res) => {
    res.json(winners)
})

app.post('/api/count', (req, res) => {
    const body = req.body
    if (body.name === undefined) {
        console.log("noname" )
    } else {
        console.log(body.name)
    }

    count.number = count.number + 1

    let newCount = count.number
    if (newCount % 100 === 0) {
        count.winner = true
        count.message = "Winner!"
        if (body.name === undefined) {
            winners = winners.concat('Unknown')
        } else {
            winners = winners.concat(req.name)
        }
    } else {
        count.winner = false
        count.message = "No win"
    }

    res.json(count)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
