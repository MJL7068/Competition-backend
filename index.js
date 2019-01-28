const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(cors())

let count = {
    number: 85,
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
    count.number = count.number + 1

    let newCount = count.number
    if (newCount % 100 === 0) {
        count.winner = true
        count.message = "Winner!"
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
