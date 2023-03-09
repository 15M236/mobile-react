import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios'
import env from '../../environment';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('') 
  const[name , setName] = useState('')
  const[number , setNumber] = useState('') 
  const navigate = useNavigate()
  env.apiurl = "https://mobile-node.onrender.com"

  const handleSignIn = async() => {
    let res = await axios.post(`${env.apiurl}/users/signup`,{
      name,
      number,
      email,
      password,
      role:"customer",
    })
    if(res.data.statusCode===200)
    {
    //  console.log("user creation successfully")
    sessionStorage.setItem("isSignIn",false) 
     navigate('/login')
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

              <h2 class="fw-bold mb-2 text-uppercase">SIGN UP</h2>
              <p class="text-white-50 mb-5">Please enter your details!</p>

              <div class="form-outline form-white mb-4">
              <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>

              <div class="form-outline form-white mb-4">
              <Form.Control type="text" placeholder="Enter Phone Number" value={number} onChange={(e)=>setNumber(e.target.value)}/>
              </div>

              <div class="form-outline form-white mb-4">
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div class="form-outline form-white mb-4">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>

              <Button className='btn btn-outline-light btn-lg px-5' variant="outlined" onClick={()=>handleSignIn()}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
