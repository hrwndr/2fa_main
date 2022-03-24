const express = require('express')
const router = express.Router()
const { createUser } = require('../db/db')

router.post('/register', (req, res) => {
    const { name, email, password } = req.body
    if (name != '' && email != '' && password != '') {
        try {
            createUser(name, email, password)
            res.status(200).json({
                error: 0,
                message: "You are registered successfuly! 🥳"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: 'Something went wrong!'
            })
        }
    }
})

module.exports = router