import './index.css';
import Header from './components/Header.js';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customer from './pages/Customer';

function App () {
  return (
    <BrowserRouter>
      <Header>
        <Routes>

          <Route path='/employees' element={<Employees />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/definition' element={<Definition />} />
          <Route path='/dictionary/:search' element={<Definition />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/customers/:id' element={<Customer />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} /> {/* if doesn't match any path that exist => return to 404 page */}

        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
