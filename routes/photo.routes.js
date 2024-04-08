const Router = require('express')
const photoController = require('../controller/photo.controller')

const router = new Router()

router.post('/create', photoController.create)
router.post('/delete', photoController.delete)
router.get('/check', (req,res)=>{
    res.json({message:'working'})
})


// router.put('/user', userController.update)
// router.delete('/user/:id', userController.deleteUser)

module.exports = router