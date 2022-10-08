import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";

import { Container } from '@mui/material';

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App;