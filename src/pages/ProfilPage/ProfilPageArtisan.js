import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './ProfilPage.css'

const ProfilPageArtisan = () => {
    const [username, setUsername] = useState('');
    const [artisanId, setArtisanId] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || 'username');
        
        const fetchArtisanId = async () => {
            try {
                const response = await axios.get(`https://snaati-backend.onrender.com/api/artisans/id-by-username/${storedUsername}`);
                setArtisanId(response.data.artisanId);
                console.log(response.data.artisanId);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'ID de l\'artisan', error);
                setError('Erreur lors de la récupération de l\'ID de l\'artisan.');
            }
        };

        if (storedUsername) {
            fetchArtisanId();
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (artisanId) {
                try {
                    const response = await axios.get(`https://snaati-backend.onrender.com/products/artisan/${artisanId}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des produits', error);
                    setError('Erreur lors de la récupération des produits.');
                }
            }
        };

        fetchProducts();
    }, [artisanId]);

    return (
        <div className="ProfilPage">
            <Header />
            <h1 className="Bienvenue">Bienvenue {username},</h1>
            <div className="Commandes">
                <h2 className="section-title">Commandes</h2>
                {/* Ajoutez des détails ou des composants ici */}
            </div>
            <div className="Produits-disposes">
                <h2 className="section-title">Produits disposés</h2>
                {error && <p>{error}</p>}
                <div className="products-list">
                    {products.map(product => (
                        <div key={product._id} className="product">
                            <div className="product-image-container">
                                <img src={product.imageURL} alt={product.title} className="product-image" />
                                <FontAwesomeIcon icon={faHeart} className="product-like-icon" />
                            </div>
                            <div className="product-details">
                                <h4 className="product-price">{product.price} MAD</h4>
                                <h4 className="product-title">{product.title}</h4>
                                <button className="more-info-btn">Savoir Plus</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="Avis-des-clients">
                <h2 className="section-title">Avis des clients</h2>
                {/* Ajoutez des détails ou des composants ici */}
            </div>
        </div>
    );
};

export default ProfilPageArtisan;
