import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSearch, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche
  const [suggestions, setSuggestions] = useState([]); // État pour les suggestions

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const fetchProducts = async () => {
    try {
      const allResponse = await axios.get('http://localhost:3000/products');
      setAllProducts(allResponse.data); // Stocker tous les produits
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
      await fetchProducts();
    };

    loadCategoriesAndProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = allProducts
      .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(product => product.title);
    
    setSuggestions(filteredSuggestions);
  }, [searchTerm, allProducts]);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    setSuggestions([]);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSuggestions([]);
    }
  };

  return (
    <div id="body">
      <div id="header">
        <nav>
          <span id="logo">Snaati</span>
          <ul className="list-item">
            <li className="item" onClick={() => navigate("/Connexion")}>Se connecter</li>
            <li className="item" onClick={() => document.getElementById('Footer').scrollIntoView({ behavior: 'smooth' })}>Contact</li>
            <li className="item">
              <FontAwesomeIcon icon={faShoppingCart} />
            </li>
            <li className="item">
              <FontAwesomeIcon icon={faHeart} />
            </li>
            <li className="item" id="globe">
              <FontAwesomeIcon icon={faGlobe} />
            </li>
          </ul>
        </nav>
      </div>
      <div id="presentation">
        <div className="text-content">
          <h1>Snaati, l'Artisanat Authentique à Portée de Main</h1>
          <h3>Bienvenue sur notre plateforme dédiée aux artisans passionnés et aux amateurs de produits uniques !</h3>
          <div className="search-container">
            <input
              type="text"
              className="input"
              placeholder="Chercher un produit..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit} // Détecter la touche Entrée
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              onClick={handleSearchSubmit} // Déclencher la recherche au clic
            />
            {suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="section-title category-title">Catégories</h2>
      <div className="categories">
        {categories.map(category => (
          <div key={category.id} className="category" onClick={() => navigate(`/Categories/${category.name}`)}>
            <img src={category.imageUrl} alt={category.name} className="category-image" />
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
      
      <div className="all-products">
        <h2 className="section-title">Tous les Produits</h2>
        <div className="products">
          {allProducts.map(product => (
            <div key={product._id} className="product">
              <div className="product-image-container">
                <img src={product.imageURL} alt={product.title} className="product-image" />
                <FontAwesomeIcon icon={faHeart} className="product-like-icon" />
              </div>
              <h4>{product.price} MAD</h4>
              <h4>{product.title}</h4>
              <button className="more-info-btn" onClick={() => navigate(`/product/${product._id}`)}>Savoir Plus</button>
            </div>
          ))}
        </div>
      </div>

      <Footer id="Footer" />
    </div>
  );
};

export default HomePage;
