import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Inscription.css';
import axios from 'axios';

const InscriptionArtisan = () => {
    const [showLanguages, setShowLanguages] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        activityDescription: '',
    });
    const [error, setError] = useState('');

    const toggleLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`https://snaati-backend.onrender.com/api/artisans/check-email?email=${email}`);
            return response.data.exists; // Assurez-vous que votre API renvoie { exists: true/false }
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'email:', error);
            return false;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
            setError("Cette adresse e-mail est déjà utilisée.");
            return;
        }
        
        try {
            const response = await axios.post('https://snaati-backend.onrender.com/api/artisans', {username: formData.username, password: formData.password, email: formData.email, phoneNumber:formData.phoneNumber, activityDescription: formData.activityDescription});
            console.log(response.data);
            window.location.href = '/connexion'; 
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        }
    };

    return (
        <div id="inscription-artisan">
            <div id="formulaire">
                <div className="language-selector">
                    <FontAwesomeIcon icon={faGlobe} className="faGlobe" onClick={toggleLanguages} />
                    {showLanguages && (
                        <div className="languages">
                            <button className="language-button">Français</button>
                            <button className="language-button">العربية</button>
                            <button className="language-button">English</button>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="form-item">Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />
                    
                    <label htmlFor="email" className="form-item">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />

<label htmlFor="phoneNumber" className="form-item">Numéro de téléphone</label>
                    <input 
                        type="tel" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />

                    <label htmlFor="postalAddress" className="form-item">Adresse postale</label>
                    <input 
                        type="text" 
                        id="postalAddress" 
                        name="postalAddress" 
                        value={formData.postalAddress} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />

                    <label htmlFor="activityDescription" className="form-item">Description de l'activité artisanale</label>
                    <textarea 
                        id="activityDescription" 
                        name="activityDescription" 
                        value={formData.activityDescription} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />

                    <label htmlFor="password" className="form-item">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />

                    <label htmlFor="confirmPassword" className="form-item">Confirmer le mot de passe</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        className="info" 
                        required 
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit" id="next">Suivant</button>
                </form>
            </div>
            <div id="bienvenue">
                <h2>Snaati</h2>
                <p>Bienvenue sur notre plateforme dédiée aux artisans passionnés et aux amateurs de produits uniques !</p>
            </div>
        </div>
    );
};

export default InscriptionArtisan;
