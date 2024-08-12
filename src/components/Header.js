import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Ensure the path is correct
import './Header.css';

const Header = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const navigateToCart = () => {
        navigate("/cart");
    };

    const navigateToSignIn = () => {
        navigate("/Connexion");
    };

    return (
        <div id="header">
            <nav>
                <span id="logo">Snaati</span>
                <ul className="list-item">
                    <li className="item" onClick={navigateToSignIn}>Se connecter</li>
                    <li className="item">Contact</li>
                    <li className="item" onClick={navigateToCart}>
                        <div className="cart-icon-container">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cart.length > 0 && (
                                <span className="cart-badge">{cart.length}</span>
                            )}
                        </div>
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
    );
};

export default Header;
