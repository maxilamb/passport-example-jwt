const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../../db');

module.exports = new Strategy({
    secretOrKey: '12345678',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => {
    done(null, payload)
})
