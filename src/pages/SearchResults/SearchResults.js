import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './SearchResults.css'; // Assurez-vous de créer ce fichier pour les styles

const SearchResults = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    setSearchQuery(query || '');
    fetchProducts(query);
  }, [location.search]);

  useEffect(() => {
    filterProducts(searchQuery);
  }, [allProducts, searchQuery]);

  const fetchProducts = async (query) => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = (query) => {
    if (!query) {
      setFilteredProducts(allProducts);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleMoreInfoClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="search-results">
      <h1>Résultats de recherche pour: "{searchQuery}"</h1>
      <div className="results-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product">
              <div className="product-image-container">
                <img src={product.imageURL} alt={product.title} className="product-image" />
                <FontAwesomeIcon icon={faHeart} className="product-like-icon" />
              </div>
              <h4>{product.price} MAD</h4>
              <h4>{product.title}</h4>
              <button className="more-info-btn" onClick={() => handleMoreInfoClick(product._id)}>Savoir Plus</button>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;