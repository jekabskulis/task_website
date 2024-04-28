
import './App.css';
import { validateInput} from "./validation.js";

import Home from './Home.js';
import ProductAdd from './ProductAdd.js';
// eslint-disable-next-line
import {BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='container mt-3'>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-add" element={<ProductAdd />} />
        </Routes>
      </BrowserRouter>
      {
      validateInput()
      }
    </div>
  );
}


export default App;
