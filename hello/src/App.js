import './index.css';
import Header from './components/Header.js';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Dictionary from './components/Dictionary';

function App () {
  return (
    <BrowserRouter>
      <Header>
        <Routes>

          <Route path='/employees' element={<Employees />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/customers' element={<Customers />} />

        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
