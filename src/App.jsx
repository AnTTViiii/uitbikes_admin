import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Blank from './pages/Blank'
import Login from './pages/Login';
import Customers from './pages/Customers';
import Brands from './pages/Brands';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Requests from './pages/Requests';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthed } = useSelector((state) => state.auth);
  const login = isAuthed ? true : false;
  
  return (
      <BrowserRouter>
        <Routes>
          {
            login ? (
              <Route path='/' element={<MainLayout />} >
                <Route index element={<Dashboard />} />
                <Route path='customers' element={<Customers />} />
                <Route path='brands' element={<Brands />} />
                <Route path='products' element={<Products />} />
                <Route path='orders' element={<Orders />} />
                <Route path='requests' element={<Requests />} />
                <Route path='admin' element={<Admin />} />
              </Route>
            ) : (
              <Route path='/'>
                <Route index element={<Login />} />
              </Route>
            )
          }
        </Routes>
      </BrowserRouter>
  );
}

export default App;
