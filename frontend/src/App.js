import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AllCollection from './Pages/AllCollection';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import SingleProduct from './Pages/SingleProduct';
import PlaceOrder from './Pages/PlaceOrder';
import Order from './Pages/Order';
import { SearchProvider } from '../src/Context/SearchContext';

function Layout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<AllCollection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order" element={<Order />} />
        
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
