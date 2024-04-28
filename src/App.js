
import './App.css';

import Home from './Home.js';
import ProductAdd from './ProductAdd.js';

import {BrowserRouter as Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='container mt-3'>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-add" element={<ProductAdd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
