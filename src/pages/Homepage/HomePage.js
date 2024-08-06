// HomePage.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSearch, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://snaati-backend.onrender.com//api/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const fetchProducts = async () => {
    try {
      const allResponse = await axios.get('https://snaati-backend.onrender.com//products');
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

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 5) % newProducts.length);
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex - 5 + newProducts.length) % newProducts.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextProduct();
    }, 8000);
    return () => clearInterval(interval);
  }, [newProducts]);

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("../Connexion");
  };

  const handleScrollToFooter = () => {
    const footerElement = document.getElementById('Footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (type) => {
    navigate(`../Categories/${type}`);
  };

  // Fonction pour rediriger vers la page de détails du produit
  const handleMoreInfoClick = (productId) => {
    navigate(`../product/${productId}`);
  };

  return (
    <div id="body">
      <div id="header">
        <nav>
          <span id="logo">Snaati</span>
          <ul className="list-item">
            <li className="item" onClick={navigateToSignIn}>Se connecter</li>
            <li className="item" onClick={handleScrollToFooter}>Contact</li>
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
            <input type="text" className="input" placeholder="Chercher un produit..." />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>
      </div>
      <h2 className="section-title category-title">Catégories</h2>
      <div className="categories">
        {categories.map(category => (
          <div key={category.id} className="category" onClick={() => handleCategoryClick(category.name)}>
            <img src={category.imageUrl} alt={category.name} className="category-image" />
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
      
      <div className="all-products">
        <h2 className="section-title">Tous les Produits</h2>
        <div className="products">
          {allProducts.map(product => (
            <div key={product.id} className="product">
              <div className="product-image-container">
                <img src={product.imageURL} alt={product.title} className="product-image" />
                  <FontAwesomeIcon icon={faHeart} className="product-like-icon" />
              </div>
              <h4>{product.price} MAD</h4>
              <h4>{product.title}</h4>
              {console.log(product._id)}
              <button className="more-info-btn" onClick={() => handleMoreInfoClick(product._id)}>Savoir Plus</button>
            </div>
          ))}
        </div>
      </div>

      <Footer id="Footer" />
    </div>
  );
};

export default HomePage;
