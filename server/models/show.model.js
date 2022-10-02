const mongoose = require('mongoose')


const ShowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Show/Festival must have a name"],
        minLength: [3, "Show/Festival must be at least 3 characters"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minLength: [3, "Location must be at least 3 characters"]
    },
    date: {
        type : String,
        required: [true, 'Show/Festival must have a date'],
    },
    artist: {
        type: [String]
    }
}, {timestamps: true})

module.exports = mongoose.model('Show', ShowSchema)
// same as const Show = mongoose.model('Show', ShowSchema);
// module.exports = Show;