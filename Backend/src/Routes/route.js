const express = require('express')
const router = express.Router()

const {stock,predictedStock} = require("../Controllers/stockController")


router.get('/api/stock/:symbol',stock)
router.get('/predictedStock/:symbol',predictedStock)


module.exports = router
