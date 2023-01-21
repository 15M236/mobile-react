import './App.css';
import Title from './Title'
import React from 'react';
import {Routes , Route, BrowserRouter} from 'react-router-dom';
import SignUp from './components/users/SignUp'
import Login from './components/users/Login';
import Products from './components/users/Products';
export const CartContext = React.createContext();
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Title/>
        <Routes>
          <Route>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/signin" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login" element={<Products/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
