const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('build'))

let count = {
    number: 0
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

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('api/count', (req, res) => {
    res.json(count)
})

app.get('api/winners', (req, res) => {
    res.json(winners)
})

app.post('api/count', (req, res) => {
    count.number = count.number + 1
    res.json(count)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
