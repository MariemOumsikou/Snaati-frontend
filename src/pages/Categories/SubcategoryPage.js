// src/pages/SubcategoryPage.js
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CategoryPage.css';

function SubcategoryPage() {
  const { categoryName, subcategoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategoryProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/subcategory/${subcategoryName}`);
      if (response.status === 200) {
        setCategoryProducts(response.data);
      } else {
        throw new Error('Erreur lors de la récupération des produits');
      }
    } catch (error) {
      setError(`Erreur lors de la récupération des produits: ${error.message}`);
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [subcategoryName]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  const filteredProducts = categoryProducts.filter(product => {
    const searchQueryLower = searchQuery.toLowerCase();
    return product.title.toLowerCase().includes(searchQueryLower);
  });

  const navigate = useNavigate();

  const handleMoreInfo = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div id='body'>
      <Header />
      <div id="presentation">
        <div className="text-content">
          <h1 className="subcategory-title">
            Produits de {subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1)}
          </h1>
          <h3>Découvrez notre collection de {subcategoryName} artisanaux.</h3>
          <div className="search-container">
            <input
              type="text"
              className="input"
              placeholder="Chercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>
      </div>

      <h2 className="section-title">
        Produits pour {subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1)}
      </h2>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="subcategoryProducts">
          {filteredProducts.length ? (
            filteredProducts.map(product => (
              <div key={product._id} className="subcategoryProduct">
                <img src={product.imageURL} alt={product.title} className="subcategoryProduct-image" />
                <div className="subcategoryProduct-details">
                  <h3 className="subcategoryProduct-title">{product.title}</h3>
                  <p className="subcategoryProduct-price">{product.price} MAD</p>
                  <button className="more-info-btn" onClick={() => handleMoreInfo(product._id)}>Savoir Plus</button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SubcategoryPage;
