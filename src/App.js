import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage/HomePage'; 
import Connexion from './pages/Connexion/Connexion';
import InscriptionArtisan from './pages/Inscription/InscriptionArtisan';
import InscriptionClient from './pages/Inscription/InscriptionClient';
import CategoryPage from './pages/Categories/CategoryPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ProfilPageArtisan from './pages/ProfilPage/ProfilPageArtisan';
import ProfilPageClient from './pages/ProfilPage/ProfilPageClient';
import SubcategoryPage from './pages/Categories/SubcategoryPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/ProductDetails/CartPage';
import SearchResults from './pages/SearchResults/SearchResults';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'; 

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription/InscriptionArtisan" element={<InscriptionArtisan />} />
          <Route path="/Inscription/InscriptionClient" element={<InscriptionClient />} />
          <Route path="/Categories/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/ProfilPage/ProfilPageArtisan" element={<ProfilPageArtisan />} />
          <Route path="/ProfilPage/ProfilPageClient" element={<ProfilPageClient />} />
          <Route path="/Categories/:categoryName/subcategory/:subcategoryName" element={<SubcategoryPage />} />
          <Route path="/cart" element={<CartPage />} />        
          <Route path="/search" element={<SearchResults />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
