const { deepStrictEqual } = require('assert')
const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter(dino => dino.name.toLowerCase()===nameFilter.toLowerCase())
    }
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

// new dino form route
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// show route
router.get('/:id', (req, res) => {
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // identify the index of the dino in question
    let dinoIndex = req.params.id
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// post route
router.post('/', (req, res) => {
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add the new data to the array
    dinoData.push(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to index route
    res.redirect('/dinosaurs')
})

// get /dinosaurs/edit/:id
router.get('/edit/:id', (req, res) => {
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/edit.ejs', {
        dinoId: req.params.id,
        dino: dinoData[req.params.id]
    })
})

// put /dinosaurs/:id update a dino
router.put('/:id', (req, res) => {
    // get the dinos from the dinos json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // update the dino base on the req.params.id and the req.body = update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type
    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to all dinos
    res.redirect('/dinosaurs')
})

// delete /dinosaurs/:id 
router.delete('/:id', (req, res) => {
    // get the dinos data from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // splice dino out fof the array (index from the req.params)
    // array.splice(starting index to remove, how many elements to remove)
    dinoData.splice(req.params.id, 1)
    // save the dino json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to see all dinos
    res.redirect('/dinosaurs')
})

module.exports = router