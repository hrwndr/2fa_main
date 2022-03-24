const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')

router.post('/verifyauthcode', async (req, res) => {
    const { uid, code } = req.body
    if (code != '') {
        try {
            axios.post(`${process.env.AUTH_SERVER_URL}/api/verifyusing2fa`, { uid: parseInt(uid) }).then(r => {
                if (!r.data.error) {
                    jwt.verify(r.data.token, process.env.JWT_SECRET_KEY, (err, result) => {
                        if (err) throw err;
                        if (result.code == code) {
                            jwt.sign({ uid }, process.env.JWT_SECRET_KEY, (err, token) => {
                                if (err) throw err
                                res.status(200).json({
                                    status: 1,
                                    message: "Authorized!",
                                    token
                                })
                            })
                        } else {
                            res.status(400).json({
                                error: 1,
                                message: "Invalid 2FA Code!"
                            })
                        }
                    })
                }
            })
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