import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './ProductDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
  const { id } = useParams();
  const [productinfos, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]); // Assuming you have some way to fetch and store comments


  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products
        const response = await axios.get('https://snaati-backend.onrender.com/products');
        const products = response.data;

        // Find the product with the matching ID
        const product = products.find(p => p._id === id);

        if (product) {
          setProduct(product);

          // Find similar products based on category
          const similar = products.filter(p => p.category === product.category && p._id !== id);
          setSimilarProducts(similar);

          // Fetch product comments (if applicable)
          // const commentsResponse = await axios.get(`https://snaati-backend.onrender.com/products/${id}/comments`);
          // setComments(commentsResponse.data);
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
      // Submit the new comment (you may need to adjust the URL and payload)
      await axios.post(`https://snaati-backend.onrender.com/products/${id}/comments`, { comment: newComment });

      // Update the comments state
      setComments([...comments, { text: newComment, date: new Date().toISOString() }]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setError('Failed to submit comment. Please try again later.');
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
                <FontAwesomeIcon
                  icon={faSearchPlus}
                  className={`zoom-icon ${isZoomed ? 'hidden' : ''}`}
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
            <button className="add-to-cart">Ajouter dans le pannier</button>
            <h5>Laissez nous un commentaire</h5>
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
            <h5>Nombre d'avis avis</h5>
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
