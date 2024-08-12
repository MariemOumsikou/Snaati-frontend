import React from 'react';
import { useCart } from '../../context/CartContext'; // Ensure the path is correct
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CartPage.css';

const CartPage = () => {
    const { cart } = useCart();

    // Calculate total price
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    return (
        <div className="cart-page">
            <Header />
            <div className="cart-content">
                <h1>Votre Panier</h1>
                {cart.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <div className="cart-table-container">
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                    <th>Prix Unitaire</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={product.imageURL} alt={product.title} className="cart-product-image" />
                                            <span>{product.title}</span>
                                        </td>
                                        <td>1</td> {/* Assuming quantity is 1 for simplicity */}
                                        <td>{product.price} MAD</td>
                                        <td>{product.price} MAD</td> {/* Total is same as unit price here */}
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="3">Total</td>
                                    <td>{totalPrice} MAD</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="continue-shopping" onClick={() => window.location.href = '/checkout'}>
                            Continuer l'achat
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
