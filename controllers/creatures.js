const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let typeFilter = req.query.typeFilter
    if(typeFilter) {
        creatureData = creatureData.filter(creature => creature.type.toLowerCase()===typeFilter.toLowerCase())
    }
    res.render('prehistoricCreatures/index.ejs', {myCreature: creatureData})
})

// new dino form route
router.get('/new', (req, res) => {
    res.render('prehistoricCreatures/new.ejs')
})

// show route
router.get('/:id', (req, res) => {
    // get the array of creatures from the json
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // identify the index of the dino in question
    let creatureIndex = req.params.id
    res.render('prehistoricCreatures/show.ejs', {myCreature: creatureData[creatureIndex]})
})

// post route
router.post('/', (req, res) => {
    // get the array of creatures from the json
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // add the new data to the array
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to index route
    res.redirect('/prehistoric_creatures')
})

// get /prehistoric_creatures/edit/:id
router.get('/edit/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    res.render('prehistoricCreatures/edit.ejs', {
        creatureId: req.params.id,
        creature: creatureData[req.params.id]
    })
})

// put /prehistoric_creatures/:id update a creature
router.put('/:id', (req, res) => {
    // get the creatures from the creatures json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // update the creature basedon the req.params.id and the req.body = update
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url
    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to all dinos
    res.redirect('/prehistoric_creatures')
})

// delete /prehistoric_creatures/:id 
router.delete('/:id', (req, res) => {
    // get the creatures from the creatures json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // splice creature out of the array (index from the req.params)
    // array.splice(starting index to remove, how many elements to remove)
    creatureData.splice(req.params.id, 1)
    // save the creature json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to see all creature
    res.redirect('/prehistoric_creatures')
})

module.exports = router