const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Chicken = require('./models/Chicken');
const app = express();

mongoose.connect('mongodb+srv://paul:2wRqzCyTozc2SVou@cluster0.fevfh.mongodb.net/myFirstDatabase',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
});

app.use(bodyParser.json());

app.get('/chicken', (req, res) => {
    Chicken.find()
        .then(chickens => res.status(200).json(chickens))
        .catch(error => res.status(400).json(error));
});

app.get('/chicken/status', (req, res) => {
    Chicken.find()
        .then(chickens => res.status(200).json(
            {
                total: chickens.length,
                stepsAverage: chickens.map(piou => piou.steps).reduce(function (a,b) {return a + b;}) / chickens.length,
                weightAverage: chickens.map(piou => piou.weight).reduce(function (a,b) {return a + b;}) / chickens.length
            }))
        .catch(error => res.status(400).json(error));
});

app.get('/coop', (req, res) => {
    Chicken.find({ zone: 'coop' })
        .then(chickens => res.status(200).json(chickens))
        .catch(error => res.status(400).json(error));
});

app.get('/coop/status', (req, res) => {
    Chicken.find({ zone: 'coop' })
        .then(chickens => res.status(200).json({ total: chickens.length , chickens: chickens.map(piou => piou.name)}))
        .catch(error => res.status(400).json(error));
});

app.get('/farmyard/status', (req, res) => {
    Chicken.find({ zone: 'farmyard' })
        .then(chickens => res.status(200).json({ total: chickens.length , chickens: chickens.map(piou => piou.name)}))
        .catch(error => res.status(400).json(error));
});

app.get('/farmyard', (req, res) => {
    Chicken.find({ zone: 'farmyard' })
        .then(chickens => res.status(200).json(chickens))
        .catch(error => res.status(400).json(error));
})

app.get('/chicken/:id', (req, res) => {
    Chicken.findOne( { _id: req.params.id })
        .then(chicken => res.status(200).json(chicken))
        .catch(error => res.status(404).json(error));
});

app.patch('/chicken/run/:id', (req, res) => {
    Chicken.findOneAndUpdate({ _id: req.params.id }, { $inc: { steps: 1 } })
        .then(() => res.status(200).json({ message: 'objet modifié' }))
        .catch(error => res.status(400).json({ error }));
});

app.patch('/chicken/:id/goTo/:zone', (req, res) => {
    if (req.params.zone !== 'farmyard' && req.params.zone !== 'coop')
        return res.status(400).json({ message: 'zone innexistante' })
    Chicken.findOneAndUpdate({ _id: req.params.id }, { zone: req.params.zone })
        .then(() => res.status(200).json({ message: 'objet modifié' }))
        .catch(error => res.status(400).json({ error }));
});

app.patch('/chicken/:id/goRun', (req, res) => {
    Chicken.findOneAndUpdate({ _id: req.params.id }, { isRunning: true })
        .then(() => res.status(200).json({ message: 'objet modifié' }))
        .catch(error => res.status(400).json({ error }));
});

app.patch('/chicken/:id/stop', (req, res) => {
    Chicken.findOneAndUpdate({ _id: req.params.id }, { isRunning: false })
        .then(() => res.status(200).json({ message: 'objet modifié' }))
        .catch(error => res.status(400).json({ error }));
});

app.post('/chicken', (req, res) => {
    delete req.body._id;
    const chicken = new Chicken({
        ...req.body,
        'zone': req.body.zone === 'farmyard' ? 'farmyard' : 'coop'
    });
    chicken.save()
        .then(() => res.status(201).json({ message: 'objet créé' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/chicken/:id', (req, res) => {
    Chicken.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "objet supprimé !" }))
        .catch(error => res.status(400).json({ error }));
})

module.exports = app;