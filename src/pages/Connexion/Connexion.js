import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Connexion.css';
import axios from "axios";

const Connexion = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('client');
    const [error, setError] = useState('');
    const [showLanguages, setShowLanguages] = useState(false);
    const [showInscriptionOptions, setShowInscriptionOptions] = useState(false);

    const toggleLanguages = () => {
        setShowLanguages(!showLanguages);
    };

    const toggleInscriptionOptions = () => {
        setShowInscriptionOptions(!showInscriptionOptions);
    };

    const navigateToInscription = (type) => {
        if (type === 'Client') {
            navigate("../Inscription/InscriptionClient");
        } else if (type === 'Artisan') {
            navigate("../Inscription/InscriptionArtisan");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = userType === 'artisan' ? 'http://localhost:3000/api/artisans' : 'http://localhost:3000/api/clients';
            const response = await axios.post(apiUrl + '/login', {
                username,
                password
            });

            if (response.data.success) {
                localStorage.setItem('username', username);
               
                // Redirection selon le type d'utilisateur
                if (userType === 'artisan') {
                    navigate('../ProfilPage/ProfilPageArtisan'); // Utilisation de navigate pour redirection
                } else {
                    navigate('../ProfilPage/ProfilPageClient'); // Utilisation de navigate pour redirection
                }
            } else {
                setError(response.data.message || 'Erreur lors de la connexion');
            }
        } catch (error) {
            console.error('Erreur de connexion', error);
            setError('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <div id="connexion">
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
                <form>
                    <label htmlFor="username" className="form-item">Nom de l'utilisateur</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="info" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password" className="form-item">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="info" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="userType" className="form-item">Type utilisateur</label>
                    <select 
                        id="userType" 
                        className="info" 
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="artisan">Artisan</option>
                        <option value="client">Client</option>
                    </select>
                </form>
                <button id='conn-btn' onClick={handleLogin}>Connexion</button>
                {error && <p id='msg'>{error}</p>}
                <p id='msg'>Mot de passe oublié?</p>
            </div>
            <div id="bienvenue">
                <h2>Bienvenue chez Snaati!</h2>
                <p>Vous n'avez pas un compte?</p>
                <button id="inscription" onClick={toggleInscriptionOptions}>S'inscrire</button>
                {showInscriptionOptions && (
                    <div className="inscription-options">
                        <button className="inscription-button" onClick={() => navigateToInscription('Client')}>Client</button>
                        <button className="inscription-button" onClick={() => navigateToInscription('Artisan')}>Artisan</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connexion;
