// src/pages/CategoryPage.js
import { useParams , useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';  // Importer axios
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CategoryPage.css';  // Importez le fichier CSS

function CategoryPage() {
  const { categoryName } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Fetch subcategories and category products when categoryName or selectedSubcategory changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`https://snaati-backend.onrender.com//categories/${categoryName}/subcategories`);
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get('https://snaati-backend.onrender.com//products', {
          params: {
            category: categoryName,
            subcategory: selectedSubcategory
          }
        });
        setCategoryProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSubcategories();
    fetchCategoryProducts();
  }, [categoryName, selectedSubcategory]);

  // Filtrage des produits
  const filteredProducts = categoryProducts.filter(product => {
    const searchQueryLower = searchQuery.toLowerCase();

    // Vérifier si le titre du produit contient la requête de recherche
    const titleMatch = product.title.toLowerCase().includes(searchQueryLower);

    // Vérifier si le produit correspond à la catégorie ou à une sous-catégorie
    const categoryOrSubcategoryMatch = (
      product.category.toLowerCase() === categoryName.toLowerCase() ||
      subcategories.some(subcategory => 
        product.category.toLowerCase() === subcategory.name.toLowerCase()
      )
    );

    return titleMatch && categoryOrSubcategoryMatch;
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
          <h1 className="category-title">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </h1>
          <h3>Découvrez notre collection de {categoryName} artisanaux.</h3>
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
        Sous-Catégories pour {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h2>

      <div className="subcategories">
        {subcategories.map(subcategory => (
          <div 
            key={subcategory.name} 
            className={`subcategory ${selectedSubcategory === subcategory.name ? 'active' : ''}`}
            onClick={() => setSelectedSubcategory(subcategory.name)}
          >
            {subcategory.imageUrl ? (
              <img src={subcategory.imageUrl} alt={subcategory.name} className="subcategory-image" />
            ) : (
              <div className="placeholder-image">Image non disponible</div>
            )}
            <h4>{subcategory.name}</h4>
          </div>
        ))}
      </div>

      <h2 className="section-title">
        Produits pour {categoryName}
      </h2>
      
      <div className="categoryProducts">
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <div key={product._id} className="categoryProduct">
              <img src={product.imageURL} alt={product.title} className="categoryProduct-image" />
              <div className="categoryProduct-details">
                <h3 className="categoryProduct-title">{product.title}</h3>
                <p className="categoryProduct-price">${product.price}</p>
                <button className="more-info-btn" onClick={() => handleMoreInfo(product._id)}>Savoir Plus</button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage;
