import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import Header from './components/layouts/Header/Header';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Footer from './components/layouts/Footer/Footer';
import Newsletter from './components/layouts/Footer/Newsletter/NewsLetter';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import PrivateRoute from './components/Route/PrivateRoute';
import UpdateProduct from './components/Admin/UpdateProduct';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route element={<PrivateRoute />}  >
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/new/product' element={<NewProduct />} />
        <Route path='/admin/product/:id' element={<UpdateProduct />} />
        </Route>
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
