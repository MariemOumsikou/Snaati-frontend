import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [productinfos, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [commentError, setCommentError] = useState('');

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:3000/products/${id}`);
        const product = productResponse.data;
        setProduct(product);

        const similarResponse = await axios.get('http://localhost:3000/products');
        const products = similarResponse.data;
        const similar = products.filter(p => p.category === product.category && p._id !== id);
        setSimilarProducts(similar);

        const commentsResponse = await axios.get(`http://localhost:3000/comments?productId=${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Failed to fetch product details or comments:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMoreInfo = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = () => {
    if (productinfos) {
      addToCart({ ...productinfos, quantity });
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/clients?email=${email}`);

      if (response.data.length > 0) {
        // Email trouvé, ajoutez le commentaire
        await axios.post('http://localhost:3000/comments', {
          productId: id,
          clientEmail: email,
          text: newComment,
          date: new Date(),
        });
        setComments([...comments, { text: newComment, date: new Date() }]);
        setNewComment('');
        setEmail('');
        setCommentError('');
      } else {
        // Email non trouvé
        setCommentError('Veuillez vous connecter pour laisser un commentaire.');
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setCommentError('Failed to submit comment. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <div className="placeholder-image">Image not available</div>
            )}
          </div>
          <div className="product-details">
            <p id="stock">Il ne reste que {productinfos.stock} en stock stock</p>
            <h4>{productinfos.title}</h4>
            <p>{productinfos.description}</p>
            <h3>Prix: {productinfos.price} MAD</h3>
            <label htmlFor="quantity">Quantité:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className="add-to-cart" onClick={handleAddToCart}>
              Ajouter dans le pannier
            </button>
            <h5>Laissez nous un commentaire</h5>
            <form onSubmit={handleSubmitComment}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Donnez votre mail pour enregistrer votre commentaire"
                className="comment-email"
                required
              />
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Ecrivez votre commentaire içi..."
                rows="4"
                cols="50"
                className="comment-textarea"
                required
              />
              <button type="submit" className="submit-comment">
                Envoyer
              </button>
              {commentError && <p className="error-message">{commentError}</p>}
            </form>
          </div>
        </div>
        <div className="product-comments">
          <h5>Ce qu'ils disent sur le Produit</h5>
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
          <h5>Produits Similaires</h5>
          <div className="product-list">
            {similarProducts.map(product => (
              <div key={product._id} className="similar-product-item">
                <img src={product.imageURL} alt={product.title} />
                <p>{product.title}</p>
                <p>{product.price} MAD</p>
                <button className="btn" onClick={() => handleMoreInfo(product._id)}>
                  En savoir plus
                </button>
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
