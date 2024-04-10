
import './App.css';

import Home from './Home.js';
import ProductAdd from './ProductAdd.js';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className='container mt-3'>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-add" element={<ProductAdd />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
