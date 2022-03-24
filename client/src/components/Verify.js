import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Verify() {
    const [code, setCode] = useState('')
    const [msg, setMsg] = useState({
        type: '',
        msg: '',
        view: 'none'
    })

    const { uid } = useParams()
    const navigate = useNavigate()

    const verifyCode = ev => {
        ev.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/verifyauthcode`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                uid,
                code
            })
        }).then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setMsg({ type: 'success', msg: data.message, view: 'block' })
                    localStorage.setItem('token', data.token)
                    navigate(`/dashboard/${uid}`)
                } else {
                    setMsg({ type: 'danger', msg: data.message, view: 'block' })
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h1 className='mt-5 mb-3 text-center'>2F Varification</h1>

            <form className="d-flex flex-column justify-items-center align-items-center" onSubmit={verifyCode}>
                <div className={`alert alert-${msg.type} w-50 mt-3 d-${msg.view}`} role="alert">
                    {msg.msg}
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="code" className="form-label mt-2">Enter Your 2F Code</label>
                        <input type="text" className="form-control" max={6} id="code" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Verify</button>
                </div>

            </form>
        </div>
    )
}

export default Verify