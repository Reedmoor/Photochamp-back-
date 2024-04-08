const Router = require('express')
const router = new Router()

const userRouter = require('./user.routes')
const albumRouter = require('./album.routes')
const photoRouter = require('./photo.routes')

router.use('/user', userRouter)
router.use('/album', albumRouter)
router.use('/photo', photoRouter)

module.exports = router