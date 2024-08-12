import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext'; // Assurez-vous que ce chemin est correct
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [productinfos, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const { addToCart } = useCart(); // Utilisation du contexte du panier
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        const products = response.data;
        const product = products.find(p => p._id === id);

        if (product) {
          setProduct(product);
          const similar = products.filter(p => p.category === product.category && p._id !== id);
          setSimilarProducts(similar);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleMoreInfo = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(`http://localhost:3000/products/${id}/comments`, { comment: newComment });
      setComments([...comments, { text: newComment, date: new Date().toISOString() }]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setError('Failed to submit comment. Please try again later.');
    }
  };

  const handleAddToCart = () => {
    if (productinfos) {
      addToCart(productinfos);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!productinfos) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <Header />
      <div className="product-detail-content">
        <div className="product-detail-container">
          <div className="product-image-container">
            {productinfos.imageURL ? (
              <div className="image-wrapper" onClick={handleImageZoom}>
                <img
                  src={productinfos.imageURL}
                  alt={productinfos.title}
                  className={`product-image ${isZoomed ? 'zoomed' : ''}`}
                />
              </div>
            ) : (
              <div className="placeholder-image">Image non disponible</div>
            )}
          </div>
          <div className="product-details">
            <p id="stock">Il n'en reste que {productinfos.stock}</p>
            <h4>{productinfos.title}</h4>
            <p>{productinfos.description}</p>
            <h3>Price: {productinfos.price} MAD</h3>
            <button className="add-to-cart" onClick={handleAddToCart}>Ajouter dans le panier</button>
            <h5>Laissez-nous un commentaire</h5>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Write your comment here..."
                rows="4"
                cols="50"
                className="comment-textarea"
              />
              <button type="submit" className="submit-comment">Envoyer</button>
            </form>
          </div>
        </div>
        <div className="product-comments">
          <h5>Nombre d'avis</h5>
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <p>{comment.text}</p>
                <small>{new Date(comment.date).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="similar-products">
          <h5>Produits de la même catégorie</h5>
          <div className="product-list">
            {similarProducts.map(product => (
              <div key={product._id} className="similar-product-item">
                <img src={product.imageURL} alt={product.title} />
                <p>{product.title}</p>
                <p>{product.price} MAD</p>
                <button className="btn" onClick={() => handleMoreInfo(product._id)}>Savoir Plus</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
