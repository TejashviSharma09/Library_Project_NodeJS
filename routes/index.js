const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('Hello')
    res.render('index')   // Rendering our index.ejs VIEW
})

module.exports = router
