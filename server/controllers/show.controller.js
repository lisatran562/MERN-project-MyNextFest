const Show = require('../models/show.model')

module.exports.testApi = (req, res) => {
    res.json({status: "ok"})
}

// Get all
module.exports.allShows = (req, res) => {
    Show.find()
        .then(shows => res.json(shows))
        .catch(err => res.status(400).json(err))
}

// Get one
module.exports.oneShow = (req, res) => {
    // get id from params
    Show.findOne({_id: req.params.id})
        .then(oneShow => res.json(oneShow))
        .catch(err => res.status(400).json(err))
}

// Create
module.exports.addShow = (req, res) => {
    const newShow = req.body
    Show.create(newShow)
        .then(show => res.json(show))
        .catch(err => res.status(400).json(err))
}



// Update - getOne + create
module.exports.updateShow = (req, res) => {
    // grab id from params
    const idFromParams = req.params.id
    const updatedValue = req.body
    // update: criteria, updatedValue, options
    console.log(req.body)
    Show.findOneAndUpdate(
        {_id : req.params.id}, // or {_id: idFromParams}
        {"$set":updatedValue},
        {new: true, runValidators: true}
    )
        .then(updatedShow => res.json(updatedShow))
        .catch(err => res.status(400).json(err))
}

// Delete
module.exports.deleteShow = (req, res) => {
    // const idFromParams = req.params.id
    Show.deleteOne({_id: req.params.id})
        .then(message => res.json(message))
        .catch(err => res.status(400).json(err))
}