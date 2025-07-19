import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; // ✅ import CartProvider

import Home from './pages/Home';
import Shop from './pages/Shop';
import Sale from './pages/Sale';
import New from './pages/New';
import Account from './pages/Account';
import AuthPage from './pages/AuthPage.jsx';

function App() {
  return (
    <CartProvider> {/* ✅ Wrap everything */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/new" element={<New />} />
        <Route path="/account" element={<Account />} />
        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </CartProvider>
  );
}

export default App;
