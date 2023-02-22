import React from 'react'
import {CartContext} from '../../App';
import { useContext , useEffect , useState} from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import env from '../../environment';
import {  useNavigate} from 'react-router-dom';

export default function Cart() {
  let context = useContext(CartContext);
  let email = sessionStorage.getItem('email')
  const[total , setTotal] = useState(0)
  const[user,setUser] = useState([])
  const navigate = useNavigate("")


    const handleSubmit = async() => {
      console.log(email)
      try {
        let res =await axios.get(`${env.apiUrl}/users/get-data/${email}`)
        //console.log(res)
        if(res.status === 200){
          setUser(res.data.user)
        }
      }catch(error) {
        console.log(error)
      }
     
      const options = {
        key : 'rzp_test_6tmOybuvCVes5R',
        currency : 'INR',
        amount : total * 100 ,
        name : "Mobile Checkout",
        handler : function (response) {
          console.log("PAYMENT ID :",response.razorpay_payment_id);
          laststep()
        },
        prefill : {
          name : `${user.name}` ,
          email : `${user.email}`,
          contact : `${user.number}`
        }
       }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
  }

  const laststep = async() => {
    try {
      let res =  await axios.post(`${env.apiUrl}/add-bill`,{
        orderItems : context.cart,
        email : email ,
        orderAmount : total 
      }) 
      if(res.data.statusCode === 200) {
        context.setCart([])
        navigate('/products')
      }
    }catch (error) {
      console.log(error)
    }
  } 

  const updateQuantity = async(input) => {
        await axios.put(`${env.apiUrl}/update-quantity/${input._id}`)
  }

  useEffect(()=>{
    let sum = 0
    for(var i in context.cart)
    {
        sum += context.cart[i].price
        updateQuantity(context.cart[i])
    }
    setTotal(sum)
  },[context.cart])
  return (
    <div>
      {context.cart.map((product) => {
        return (
        <ul>
          <li>Name : {product.productName}</li>
          <li>Price : {product.price}</li>
        </ul>
        )
      })}
      <p>Total Price : {total}</p>
      <p>Add Bill to {email}</p>
      <Button variant="primary" onClick={handleSubmit}>Purchase</Button>
      
    </div>
  )
}
