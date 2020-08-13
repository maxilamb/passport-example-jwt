
module.exports = (groupId) => (req, res, next) => {
    console.log(req.user)
    groupId === req.user.idUserGroup ? next() : res.sendStatus(402)
}
