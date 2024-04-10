
import './App.css';

import Home from './Home.js';
import Product_add from './ProductAdd.js';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='container mt-3'>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-add" element={<Product_add />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
