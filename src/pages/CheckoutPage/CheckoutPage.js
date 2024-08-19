import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const clientResponse = await axios.get('https://snaati-backend.onrender.com/api/clients', { params: { email } });
            const clientData = clientResponse.data;
    
            if (!clientData || clientData.length === 0) {
                throw new Error('Client non trouvé');
            }
    
            const client = clientData.find(c => c.email === email);
    
            if (!client) {
                throw new Error('Client non trouvé avec cet email');
            }
    
            const clientId = client._id;
    
            // Préparer les produits pour l'envoi
            const products = cart.map(product => ({
                productId: product._id, // Assurez-vous que _id est bien l'ID du produit
                quantity: product.quantity,
                price: product.price,
            }));

            console.log({
                clientId,
                name,
                address,
                city,
                zipCode,
                paymentMethod,
                products, // Envoie la liste des produits
                totalAmount: totalPrice,
            });
    
            // Enregistrer la commande
            await axios.post('https://snaati-backend.onrender.com/orders', {
                clientId,
                products, // Envoie la liste des produits
                totalAmount: totalPrice,
                address,
            });
    
            alert('Commande enregistrée avec succès');
            clearCart();
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Erreur:', error.message);
        }
    };
    

    return (
        <div className="checkout-page">
            <Header />
            <div className="checkout-content">
                <h1>Finalisation de la commande</h1>
                <div className="order-summary">
                    <h2>Récapitulatif de la commande</h2>
                    <table className="order-summary-table">
                        <thead>
                            <tr>
                                <th>ID Produit</th> {/* Ajout de l'ID du produit */}
                                <th>Produit</th>
                                <th>Quantité</th>
                                <th>Prix Unitaire</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={index}>
                                    <td>{product._id}</td> {/* Affichage de l'ID du produit */}
                                    <td>{product.title}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price} MAD</td>
                                    <td>{product.price * product.quantity} MAD</td>
                                </tr>
                            ))}
                            <tr className="total-row">
                                <td colSpan="4">Total</td>
                                <td>{totalPrice} MAD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <form className="checkout-form" onSubmit={handleOrderSubmit}>
                    <h2>Informations de livraison</h2>
                    <label>
                        Nom complet:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Adresse:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </label>
                    <label>
                        Ville:
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </label>
                    <label>
                        Code postal:
                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                    </label>

                    <h2>Méthode de paiement</h2>
                    <label> Paiement à la livraison</label>
                    <button type="submit" className="place-order-button">Passer la commande</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
