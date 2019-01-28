const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const app = express()


app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())

let count = {
    number: 495
}

let winners = [
    {   
        id: "2d9a6274-1c5b-4d11-abf4-fd090034ed9d",
        name: 'Matti',
    },
    {
        id: "c363e405-2d59-4d2a-b61f-eef3565cc76c",
        name: 'Sanna'}
]

/*app.get('/api/count', (req, res) => {
    res.json(count)
})*/

app.get('/api/winners', (req, res) => {
    res.json(winners)
})

app.post('/api/count', (req, res) => {
    const body = req.body
    count.number = count.number + 1
    const name = (body.name === "" ? "Tuntematon" : body.name)
    let newCount = count.number
    if (newCount % 500 === 0) {
        res.json(handleWin("Voitit suuren palkinnon!", name, true))   
    } else if (newCount % 200 === 0) {
        res.json(handleWin("Voitit keskikokoisen palkinnon!", name, true))
    } else if (newCount % 100 === 0) {
        res.json(handleWin("Voitit pienen palkinnon!", name, true))
    } else {
        res.json(handleWin("Ei voittoa", name, false))
    }
})

const handleWin = (message, name, winning) => {
    const note = {
        winner: winning,
        message: message
    }

    if (winning) winners = winners.concat({id: generateID(), name: name})
    return note
}

const generateID = () => {
    return uuid.v4()
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
