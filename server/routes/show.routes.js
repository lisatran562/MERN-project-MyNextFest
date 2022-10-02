const ShowController = require('../controllers/show.controller')


module.exports = (app) => {
    app.get('/api/test', ShowController.testApi)
    app.get('/api/shows', ShowController.allShows)
    app.get('/api/shows/:id', ShowController.oneShow)
    app.post('/api/addShow', ShowController.addShow)
    app.put('/api/shows/:id', ShowController.updateShow)
    app.delete('/api/shows/:id', ShowController.deleteShow)

}