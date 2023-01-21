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
  env.apiurl = "https://capstone-fsd.onrender.com"

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
    <div>
      <div className='login-main-wrapper'>
        <p>Create a new account</p>
      <Form>
      <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter Phone Number" value={number} onChange={(e)=>setNumber(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" onClick={()=>handleSignIn()}>
          Submit
        </Button>
      </Form>
      </div>
    </div>
  )
}
