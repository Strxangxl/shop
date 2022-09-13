import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import { Container } from '@mui/material';

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App;