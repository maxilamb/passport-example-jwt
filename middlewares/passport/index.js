const db = require('../../db');

module.exports = (passport) => {

    passport.use(require('./local-strategy'))
    passport.use(require('./jwt-strategy'))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        const user = db.filter(user => user.id === id)[0];
        done(null, {id: user.id, idUserGroup: user.idUserGroup, email: user.email});
    })
}
