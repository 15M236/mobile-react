import './App.css';
import Title from './Title'
import React , {useState} from 'react';
import {Routes , Route, BrowserRouter} from 'react-router-dom';
import SignUp from './components/users/SignUp'
import AddProduct from './components/admin/AddProduct'
import Login from './components/users/Login';
import AdminDashBoard from './components/admin/AdminDashBoard'
import Products from './components/users/Products';
import Cart from './components/users/Cart'
import CustomerDashBoard from './components/users/CustomerDashBoard'
export const CartContext = React.createContext();
function App() {
  let [cart,setCart] = useState([])
  return (
    <div className="App">
      <CartContext.Provider value={{cart,setCart}}>
      <BrowserRouter>
      <Title/>
        <Routes>
          <Route>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/signin" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/customerDashboard" element={<CustomerDashBoard/>}/>
          <Route path="/adminDashboard" element={<AdminDashBoard/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/admin/add-product" element={<AddProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export default App;
