const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const app = express()
app.use(express.json())

require('./middlewares/passport')(passport)

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        session: req.session,
        user: req.user
    })
});

app.get('/secret', passport.authenticate('jwt', { session: false }),require('./middlewares/isUserGroup')(1) , (req, res) => {
    res.json({
        session: req.session,
        user: req.user
    })
});


app.get('/logout', (req, res) => {
    req.logout()
    res.json({
        session: req.session,
        user: req.user
    })
})

app.post('/auth', (req, res) => {
    const db = require('./db');
    const { email, password } = req.body;
    const user = db.filter(user => user.email === email && user.password === password)[0];
    user ?
        res.json({
            token: jwt.sign({ id: user.id, idUserGroup: user.idUserGroup }, '12345678')
        })
        :
        res.sendStatus(400);
})

app.listen(5000)

