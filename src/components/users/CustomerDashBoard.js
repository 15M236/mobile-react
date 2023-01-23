import React, { useEffect , useState , useCallback} from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import env from '../../environment';
import Table from 'react-bootstrap/Table';
import DisplayItems from '../admin/DisplayItems';
import { useNavigate } from 'react-router-dom'


export default function CustomerDashBoard() {
  let email = sessionStorage.getItem('email');
  const[count , setCount] = useState(0)
  const[bills,setBills] = useState([])
  let navigate = useNavigate()
 
  
  const listbills = useCallback( async() => {
    let res =await axios.get(`${env.apiUrl}/get-bill/${email}`)
    if(res.data.statusCode === 200 ){
      setBills(res.data.result)
      setCount(res.data.result.length)
    }else {
      console.log("No bills found")
    }
  },[email])

  useEffect(() => {
    listbills()
  },[listbills])
  return (
    <div>
      <Button variant="primary" onClick={() => navigate('/products')} >Continue to purchase</Button>
      <p>Customer Dash Board</p>
        <p>Number of Bills Generated : {count}</p>          
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Total Amount</th>
              <th>purchasedAt</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill,i) => {
              return ( 
                <tr className='table-row details'>
                  <DisplayItems  value={bill} key={i}></DisplayItems>
                  <th>{bill.orderAmount}</th>
                  <th>{bill.purchasedAt}</th>
                </tr>
              )
            })}
          </tbody>
        </Table>
      
    </div>
  )
}
