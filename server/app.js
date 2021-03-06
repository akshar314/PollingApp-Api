import express from 'express'
import db from 'sequelize-connect'
import path from 'path'
import pollController from './controllers/pollController'
import voteController from './controllers/voteController'
import bodyParser from 'body-parser'


    async function demo() {
        
        db.discover = path.join(__dirname, 'models')
        db.matcher = function shouldImportModel (modelFileName) {
            return true
        }
        await db.connect('andvote_schema', 'root', 'root',{force:true})
    }


    (async function () {
    try{
        await demo()
    } catch(err){
        console.log("An error occured connecting to database "+err);
    }
    const app = express()
    app.use(bodyParser.json())
    app.post('/api/poll',pollController.handlePost)
    app.get('/api/poll/:pollId',pollController.handleGet)
    app.post('/api/vote',voteController.handlePost)
        const port =3000
    app.listen(port,()=> console.log('Running on port '+port))

})()











