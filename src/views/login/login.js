import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
// import css
import "../login/style.css"
import logo from "../../img/logo.png"
// import sweetAlert
import Swal from 'sweetalert2'
// import react-icons
import { HiArrowNarrowRight } from "react-icons/hi";
// import react-bootstrap
import { Button, Form, Col, Row } from "react-bootstrap"
// import img
import eclipse1 from "../../img/Ellipse 3.png"
import eclipse2 from "../../img/Ellipse 4.png"
import ilus from "../../img/illustration.png"



const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        Swal.fire({
            title: "Loading...",
            showConfirmButton: false,
            backdrop: `rgba(0,0,123,0.4)`
        })

        axios.post("https://restapilogin.herokuapp.com/auth/login", data)
            .then(async (res) => {
                await Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                    backdrop: `rgba(0,0,123,0.4)`
                })
                localStorage.setItem('isAuth', 1);
                localStorage.setItem('userData', JSON.stringify(res.data));
                history.push("/auth/dashboard")
            }).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.response.data.msg
                })
            })
    }

    return (
        <div className='d-flex flex-row'>
            <div className='left'>
                <div className="logo">
                    <img src={logo} alt='logo' />
                </div>
                <h3 className='title'>Log In and Learn The Report</h3>
                <p className='summary'>
                    We provide variant data that you can use it in order <br />
                         to get the better perfomance at sales
                        </p>
                <div className='kartu d-flex flex-column'>
                    <Form onSubmit={handleLogin}>
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div>
                            <label class="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className='forgot mb-3 mt-1'>
                            <a href="#">Forgot My Password</a>
                        </div>
                        <button type="submit" class="btn btn-primary signin">
                            Login
                            </button>
                        <div className='newaccount'>
                            <Link to="/register">
                                Create New Account
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="right pl-5">
                <div className="eclipse-top">
                    <img src={eclipse2} alt='variasi' />
                </div>
                <div className="eclipse-bottom">
                    <img src={eclipse1} alt='variasi' />
                </div>
                <div className='ilustration d-flex justify-content-center d-flex flex-column'>
                    <img src={ilus} alt="ilustration" />
                    <div className='text'>
                        <h4>Simple is Key</h4>
                        <p>
                            Generate business model with no hustle and headache
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
