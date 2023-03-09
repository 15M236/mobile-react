import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form';
import env from '../../environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('')  
  let [toggle,setToggle]=useState(false)
  let [message,setMessage]=useState("")
  let navigate = useNavigate()
  env.apiurl = "https://mobile-node.onrender.com"

  let handleLogin = async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/login`,{
      email,
      password
    })
    if(res.data.statusCode===200)
    {
      setToggle(false)
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('role',res.data.role)
      sessionStorage.setItem('email',res.data.email)
      sessionStorage.setItem("isSignIn",false) 
      if(res.data.role === 'admin'){
        navigate('/adminDashboard')
      }else {
        navigate('/customerDashboard')
      }
       
    }
    else
    {
      setToggle(false)
      setPassword("")
      setEmail("")
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
      },3000)

    }
  }

  return (
    <>
<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style={{ borderRadius : "1rem" }}>
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Please enter your login and password!</p>

              <div class="form-outline form-white mb-4">
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div class="form-outline form-white mb-4">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>

              <Button className='btn btn-outline-light btn-lg px-5' variant="outlined" onClick={()=>handleLogin()}>Submit</Button>

            </div>

            <div>
              <p class="mb-0">Don't have an account? <button onClick={() => navigate('/')} class="text-50 fw-bold">Sign Up</button>
              </p>
            </div>
          </div>
          {toggle ?<Spinner animation="border" variant="primary" />:<></>}
          {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

