import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        } else {
            const token = localStorage.getItem('token')
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/verifyauthtoken`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    token
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        navigate('/login')
                    }
                }).catch(err => navigate('/login'))
        }
    }, [])

    return (
        <div className="container text-center">
            <h1 className='my-5'>Dashboard</h1>
            <div className="d-flex flex-column justify-items-center align-items-center">
                <h3>Hello! 👋</h3>
                <p className="my-3">You are successfully logged into 2FA application. Enjoy 🥳🥳</p>
                <button className="btn btn-danger" onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/login')
                }}>Log Out</button>
            </div>
        </div>
    )
}

export default Dashboard