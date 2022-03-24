const express = require('express')
const router = express.Router()
const { checkUser } = require('../db/db')

router.post('/checkUser', async (req, res) => {
    const { email } = req.body
    if (email != '') {
        try {
            const result = await checkUser(email)
            console.log(result[0])
            if (result[0] != undefined) {
                const { name, email, id } = result
                res.status(200).json({
                    match: 1,
                    message: "You are registered!",
                    user: { name, email, id }
                })
            } else {
                res.status(200).json({
                    match: 0,
                    message: "Not registered!"
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: 'Unknown Error!'
            })
        }
    }
})

module.exports = router