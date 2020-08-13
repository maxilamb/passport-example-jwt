const {Strategy} = require('passport-local');
const db = require('../../db');

module.exports = new Strategy({
    usernameField: "email"
}, (email, password, done) => {
    const user = db.filter(user => user.email === email && user.password === password)[0]
    if (!user) return done('User not found', user);
    return done(null, {id: user.id, idUserGroup: user.idUserGroup, email: user.email});
});
