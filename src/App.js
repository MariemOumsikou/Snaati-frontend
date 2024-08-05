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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/Connexion" element={<Connexion />} />
                <Route path="/Inscription/InscriptionArtisan" element={<InscriptionArtisan />} />
                <Route path="/Inscription/InscriptionClient" element={<InscriptionClient />} />
                <Route path="/Categories/:categoryName" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/ProfilPage/ProfilPageArtisan" element={<ProfilPageArtisan />} />
                <Route path="/ProfilPage/ProfilPageClient" element={<ProfilPageClient />} />
            </Routes>
        </Router>
    );
}

export default App;
